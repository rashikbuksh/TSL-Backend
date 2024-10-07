CREATE OR REPLACE FUNCTION store_material_report_function(IN start_date timestamp, IN end_date timestamp)
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
        m.uuid AS material_uuid,  -- Cast to uuid
        m.name AS material_name,
        -- opening
        coalesce(op.op_quantity, 0) AS opening_quantity,
        coalesce(op.op_quantity_total_price, 0) as opening_quantity_total_price,
        coalesce(op.op_quantity_total_price / coalesce(op.op_quantity, 0), 0) as opening_quantity_rate,
        -- purchase
        coalesce(cp.cp_quantity, 0) AS purchased_quantity,
        coalesce(cp.cp_quantity_total_price, 0) AS purchased_quantity_total_price,
        coalesce(cp.cp_quantity_total_price / coalesce(cp.cp_quantity, 0), 0) AS purchased_quantity_rate,
        -- sub total
        coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0) AS sub_total_quantity,
        coalesce(op.op_quantity_total_price, 0) + coalesce(cp.cp_quantity_total_price, 0) AS sub_total_quantity_total_price,
        coalesce((coalesce(op.op_quantity_total_price, 0) + coalesce(cp.cp_quantity_total_price, 0)) / coalesce((coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0)), 0), 0) AS sub_total_quantity_rate,
        -- consumption
        coalesce(cc.cc_quantity, 0) AS consumption_quantity,
        coalesce(cc.cc_quantity * (coalesce(op.op_quantity_total_price, 0) + coalesce(cp.cp_quantity_total_price, 0)) / coalesce((coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0)), 0), 0) AS consumption_quantity_total_price,
        coalesce((cc.cc_quantity * (coalesce(op.op_quantity_total_price, 0) + coalesce(cp.cp_quantity_total_price, 0)) / coalesce((coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0)), 0)) / coalesce(cc.cc_quantity, 0), 0) AS consumption_quantity_rate,
        -- closing
        (coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0)) - coalesce(cc.cc_quantity, 0) AS closing_quantity,
        (coalesce(op.op_quantity_total_price, 0) + coalesce(cp.cp_quantity_total_price, 0)) - coalesce(cc.cc_quantity * (coalesce(op.op_quantity_total_price, 0) + coalesce(cp.cp_quantity_total_price, 0)) / coalesce((coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0)), 0), 0) AS closing_quantity_total_price,
        coalesce(((coalesce(op.op_quantity_total_price, 0) + coalesce(cp.cp_quantity_total_price, 0)) - coalesce(cc.cc_quantity * (coalesce(op.op_quantity_total_price, 0) + coalesce(cp.cp_quantity_total_price, 0)) / coalesce((coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0)), 0), 0)) / coalesce(((coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0)) - coalesce(cc.cc_quantity, 0)), 0), 0) AS closing_quantity_rate
    FROM
        store.material m
        LEFT JOIN opening op ON m.uuid = op.material_uuid
        LEFT JOIN purchase cp ON m.uuid = cp.material_uuid
        LEFT JOIN consumption cc ON m.uuid = cc.material_uuid
    ORDER BY
        m.uuid;
END;
$$;