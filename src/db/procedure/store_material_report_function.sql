CREATE OR REPLACE FUNCTION store.store_material_report_function(IN start_date timestamp, IN end_date timestamp)
RETURNS TABLE (
    material_uuid text,
    material_name text,
    material_unit text,
    article_name text,
    category_name text,
    buyer_name text,
    opening_quantity float,
    opening_quantity_total_price float,
    opening_quantity_rate float,
    purchased_quantity float,
    purchased_quantity_total_price float,
    purchased_quantity_rate float,
    sub_total_quantity float,
    sub_total_quantity_total_price float,
    sub_total_quantity_rate float,
    consumption_quantity float,
    consumption_quantity_total_price float,
    consumption_quantity_rate float,
    closing_quantity float,
    closing_quantity_total_price float,
    closing_quantity_rate float
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    WITH opening AS (
        SELECT
            re.material_uuid,
            ROUND(SUM(coalesce(re.quantity, 0)),4)::float8 AS op_quantity,
            ROUND(SUM(coalesce(re.price, 0)),4)::float8 AS op_quantity_total_price
        FROM store.receive_entry re
        WHERE
            re.created_at IS NOT NULL
            AND re.created_at < start_date::TIMESTAMP
        GROUP BY
            re.material_uuid
    ),
	opening_consumption AS (
        SELECT
            i.material_uuid,
            ROUND(SUM(coalesce(i.quantity, 0)),4)::float AS oc_quantity
        FROM store.issue i
        WHERE
            i.created_at IS NOT NULL
            AND i.created_at < start_date::TIMESTAMP
        GROUP BY
            i.material_uuid
    ),
    purchase AS (
        SELECT
            re.material_uuid,
            ROUND(SUM(coalesce(re.quantity, 0)),4)::float8 AS cp_quantity,
            ROUND(SUM(coalesce(re.price, 0)),4)::float8 AS cp_quantity_total_price
        FROM store.receive_entry re
        WHERE
            re.created_at IS NOT NULL
            AND re.created_at BETWEEN start_date::TIMESTAMP AND end_date::TIMESTAMP + interval '23 hours 59 minutes 59 seconds'
        GROUP BY
            re.material_uuid
    ),
    consumption AS (
        SELECT
            i.material_uuid,
            ROUND(SUM(coalesce(i.quantity, 0)),4)::float AS cc_quantity
        FROM store.issue i
        WHERE
            i.created_at IS NOT NULL
            AND i.created_at BETWEEN start_date::TIMESTAMP AND end_date::TIMESTAMP + interval '23 hours 59 minutes 59 seconds'
        GROUP BY
            i.material_uuid
    )
    SELECT 
        m.uuid AS material_uuid,
        m.name AS material_name,
        m.unit AS material_unit,
        pa.name AS article_name,
        ca.name AS category_name,
        ba.name AS buyer_name,
        -- opening
        coalesce(coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity),0)::float8 
        AS opening_quantity,
        coalesce(
            (coalesce(op.op_quantity_total_price, 0) / NULLIF(coalesce(op.op_quantity, 0), 0)) * 
            (coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity))
        , 0)::float8 
        AS opening_quantity_total_price,
        coalesce(coalesce(op.op_quantity_total_price, 0) / NULLIF(coalesce(op.op_quantity, 0), 0), 0)::float8  AS opening_quantity_rate,
        -- purchase
        coalesce(cp.cp_quantity, 0)::float8 AS purchased_quantity,
        coalesce(cp.cp_quantity_total_price, 0)::float8 AS purchased_quantity_total_price,
        coalesce(coalesce(cp.cp_quantity_total_price, 0) / NULLIF(coalesce(cp.cp_quantity, 0), 0), 0)::float8 AS purchased_quantity_rate,
        -- sub total
        coalesce(coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity) + coalesce(cp.cp_quantity, 0),0)::float8 AS sub_total_quantity,
        coalesce(
            (coalesce(op.op_quantity_total_price, 0) / NULLIF(coalesce(op.op_quantity, 0), 0)) * 
            (coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity)) + 
            coalesce(cp.cp_quantity_total_price, 0)
        , 0)::float8 AS sub_total_quantity_total_price,
        coalesce(
            (coalesce(
                (coalesce(op.op_quantity_total_price, 0) / NULLIF(coalesce(op.op_quantity, 0), 0)) * 
                (coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity)) + 
                coalesce(cp.cp_quantity_total_price, 0)
            , 0)) / NULLIF(
                (coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity) + coalesce(cp.cp_quantity, 0)), 0
            )
        , 0)::float8 AS sub_total_quantity_rate,
        -- consumption
        coalesce(cc.cc_quantity, 0)::float8 AS consumption_quantity,
        coalesce(coalesce(cc.cc_quantity, 0) * (coalesce(
            (coalesce(op.op_quantity_total_price, 0) / NULLIF(coalesce(op.op_quantity, 0), 0)) * 
            (coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity))
        , 0) + coalesce(cp.cp_quantity_total_price, 0) / NULLIF(coalesce(op.op_quantity, 0) + coalesce(cp.cp_quantity, 0), 0)), 0)::float8 AS consumption_quantity_total_price,
        coalesce(coalesce(coalesce(cc.cc_quantity, 0) * coalesce(
            (coalesce(op.op_quantity_total_price, 0) / NULLIF(coalesce(op.op_quantity, 0), 0)) * 
            (coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity))
        , 0) + coalesce(cp.cp_quantity_total_price, 0) / NULLIF((coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity)) + coalesce(cp.cp_quantity, 0), 0), 0) / NULLIF(coalesce(cc.cc_quantity, 0), 0), 0)::float8 AS consumption_quantity_rate,
        -- closing
        coalesce((coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity)) + coalesce(cp.cp_quantity, 0) - coalesce(cc.cc_quantity, 0),0)::float8 AS closing_quantity,

        coalesce(
            (coalesce(op.op_quantity_total_price, 0) / NULLIF(coalesce(op.op_quantity, 0), 0)) * 
            (coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity))
        , 0) + coalesce(cp.cp_quantity_total_price, 0) - coalesce(coalesce(cc.cc_quantity, 0) * coalesce(
            (coalesce(op.op_quantity_total_price, 0) / NULLIF(coalesce(op.op_quantity, 0), 0)) * 
            (coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity))
        , 0) + coalesce(cp.cp_quantity_total_price, 0) / NULLIF((coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity)) + coalesce(cp.cp_quantity, 0), 0), 0)::float8 AS closing_quantity_total_price,

        coalesce((coalesce(
            (coalesce(op.op_quantity_total_price, 0) / NULLIF(coalesce(op.op_quantity, 0), 0)) * 
            (coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity))
        , 0) + coalesce(cp.cp_quantity_total_price, 0) - coalesce(coalesce(cc.cc_quantity, 0) * coalesce(
            (coalesce(op.op_quantity_total_price, 0) / NULLIF(coalesce(op.op_quantity, 0), 0)) * 
            (coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity))
        , 0) + coalesce(cp.cp_quantity_total_price, 0) / NULLIF((coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity)) + coalesce(cp.cp_quantity, 0), 0), 0)) / NULLIF(((coalesce(op.op_quantity, 0) - coalesce(oc.oc_quantity)) + coalesce(cp.cp_quantity, 0) - coalesce(cc.cc_quantity, 0)), 0), 0)::float8 AS closing_quantity_rate
    FROM
        store.material m
        LEFT JOIN opening op ON m.uuid = op.material_uuid
        LEFT JOIN purchase cp ON m.uuid = cp.material_uuid
        LEFT JOIN consumption cc ON m.uuid = cc.material_uuid
        LEFT JOIN opening_consumption oc ON m.uuid = oc.material_uuid
        LEFT JOIN public.article pa ON m.article_uuid = pa.uuid
        LEFT JOIN public.category ca ON m.category_uuid = ca.uuid
        LEFT JOIN public.buyer ba ON pa.buyer_uuid = ba.uuid
    ORDER BY
        m.uuid;
END;
$$;