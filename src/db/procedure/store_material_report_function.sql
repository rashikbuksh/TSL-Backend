CREATE OR REPLACE FUNCTION store.store_material_report_function(IN start_date timestamp, IN end_date timestamp)
RETURNS TABLE (
    material_uuid text,
    material_name text,
    opening_quantity numeric,
    opening_quantity_total_price numeric,
    opening_quantity_rate numeric,
    purchased_quantity numeric,
    purchased_quantity_total_price numeric,
    purchased_quantity_rate numeric,
    sub_total_quantity numeric,
    sub_total_quantity_total_price numeric,
    sub_total_quantity_rate numeric,
    consumption_quantity numeric,
    consumption_quantity_total_price numeric,
    consumption_quantity_rate numeric,
    closing_quantity numeric,
    closing_quantity_total_price numeric,
    closing_quantity_rate numeric
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    WITH opening AS (
        SELECT
            re.material_uuid,
            SUM(coalesce(re.quantity, 0)) AS op_quantity,
            SUM(coalesce(re.price, 0)) AS op_quantity_total_price
        FROM store.receive_entry re
        WHERE
            re.created_at IS NOT NULL
            AND re.created_at < start_date
        GROUP BY
            re.material_uuid
    ),
    purchase AS (
        SELECT
            re.material_uuid,
            SUM(coalesce(re.quantity, 0)) AS cp_quantity,
            SUM(coalesce(re.price, 0)) AS cp_quantity_total_price
        FROM store.receive_entry re
        WHERE
            re.created_at IS NOT NULL
            AND re.created_at BETWEEN start_date AND end_date
        GROUP BY
            re.material_uuid
    ),
    consumption AS (
        SELECT
            i.material_uuid,
            SUM(coalesce(i.quantity, 0)) AS cc_quantity
        FROM store.issue i
        WHERE
            i.created_at IS NOT NULL
            AND i.created_at BETWEEN start_date AND end_date
        GROUP BY
            i.material_uuid
    )
    SELECT 
        m.uuid AS material_uuid,
        m.name AS material_name,
        -- opening
        ROUND(coalesce(op.op_quantity, 0), 4) AS opening_quantity,
        ROUND(coalesce(op.op_quantity_total_price, 0), 4) AS opening_quantity_total_price,
        ROUND(coalesce(op.op_quantity_total_price / NULLIF(op.op_quantity, 0), 0), 4) AS opening_quantity_rate,
        -- purchase
        ROUND(coalesce(cp.cp_quantity, 0), 4) AS purchased_quantity,
        ROUND(coalesce(cp.cp_quantity_total_price, 0), 4) AS purchased_quantity_total_price,
        ROUND(coalesce(cp.cp_quantity_total_price / NULLIF(cp.cp_quantity, 0), 0), 4) AS purchased_quantity_rate,
        -- sub total
        ROUND(coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0), 4) AS sub_total_quantity,
        ROUND(coalesce(op.op_quantity_total_price, 0) + coalesce(cp.cp_quantity_total_price, 0), 4) AS sub_total_quantity_total_price,
        ROUND(coalesce((coalesce(op.op_quantity_total_price, 0) + coalesce(cp.cp_quantity_total_price, 0)) / NULLIF((coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0)), 0), 0), 4) AS sub_total_quantity_rate,
        -- consumption
        ROUND(coalesce(cc.cc_quantity, 0), 4) AS consumption_quantity,
        ROUND(coalesce(cc.cc_quantity * (coalesce(op.op_quantity_total_price, 0) + coalesce(cp.cp_quantity_total_price, 0)) / NULLIF((coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0)), 0), 0), 4) AS consumption_quantity_total_price,
        ROUND(coalesce((cc.cc_quantity * (coalesce(op.op_quantity_total_price, 0) + coalesce(cp.cp_quantity_total_price, 0)) / NULLIF((coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0)), 0)) / NULLIF(cc.cc_quantity, 0), 0), 4) AS consumption_quantity_rate,
        -- closing
        ROUND((coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0)) - coalesce(cc.cc_quantity, 0), 4) AS closing_quantity,
        ROUND((coalesce(op.op_quantity_total_price, 0) + coalesce(cp.cp_quantity_total_price, 0)) - coalesce(cc.cc_quantity * (coalesce(op.op_quantity_total_price, 0) + coalesce(cp.cp_quantity_total_price, 0)) / NULLIF((coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0)), 0), 0), 4) AS closing_quantity_total_price,
        ROUND(coalesce(((coalesce(op.op_quantity_total_price, 0) + coalesce(cp.cp_quantity_total_price, 0)) - coalesce(cc.cc_quantity * (coalesce(op.op_quantity_total_price, 0) + coalesce(cp.cp_quantity_total_price, 0)) / ROUND(NULLIF((coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0)), 0),4), 0)) / ROUND(NULLIF(((coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0)) - coalesce(cc.cc_quantity, 0)), 0),4), 0), 4) AS closing_quantity_rate
    FROM
        store.material m
        LEFT JOIN opening op ON m.uuid = op.material_uuid
        LEFT JOIN purchase cp ON m.uuid = cp.material_uuid
        LEFT JOIN consumption cc ON m.uuid = cc.material_uuid
    ORDER BY
        m.uuid;
END;
$$;