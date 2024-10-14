import { and, eq, min, sql, sum } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import db from '../../index.js';

export async function storeMaterialReport(req, res, next) {
	const { start_date, end_date } = req.params;
	console.log(start_date, end_date);
	const query = sql`
                   SELECT * 
                   FROM 
                   store.store_material_report_function(${start_date},${end_date})
                     `;

	const resultPromise = db.execute(query);

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select_all',
			message: 'Store Material Report',
		};
		res.status(200).json({ toast, data: data?.rows });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function storeVendorWiseMaterialReport(req, res, next) {
	const { start_date, end_date } = req.params;
	console.log(start_date, end_date);
	const query = sql`
                SELECT 
				   	vendor.uuid as vendor_uuid,
					vendor.name as vendor_name,
					m.name,
					m.unit,
					material_quantity_total.total_quantity::float8,
					material_quantity_total.price_bdt::float8,
					avg.avg_convention_rates::float8,
					ROUND(material_quantity_total.price_bdt::numeric / material_quantity_total.total_quantity::numeric, 4)::float8 as avg_price_per_unit_bdt,
					ROUND(material_quantity_total.price_bdt::numeric / avg.avg_convention_rates::numeric, 4) as price_usd,
					(ROUND(material_quantity_total.price_bdt::numeric / material_quantity_total.total_quantity::numeric, 4) / avg.avg_convention_rates)::float8 as avg_price_per_unit_usd,
					lc.number as lc_number,
					lc.created_at as lc_created_at,
					m.created_at as material_created_at
				FROM
					store.vendor
				LEFT JOIN (
					SELECT 
						re.material_uuid,
						r.vendor_uuid,
						r.lc_uuid,
						SUM(re.quantity) as total_quantity,
						SUM(re.price * r.convention_rate) as price_bdt
					FROM
						store.receive_entry re
						LEFT JOIN store.receive r ON re.receive_uuid = r.uuid
					WHERE 
						re.created_at BETWEEN ${start_date}::TIMESTAMP AND ${end_date}::TIMESTAMP + interval '23 hours 59 minutes 59 seconds'
					GROUP BY
						re.material_uuid, r.vendor_uuid
				) material_quantity_total ON vendor.uuid = material_quantity_total.vendor_uuid
				LEFT JOIN 
					store.material m ON material_quantity_total.material_uuid = m.uuid
				LEFT JOIN (
					SELECT
						ROUND(SUM(r.convention_rate) / COUNT(r.convention_rate), 4)::float8 AS avg_convention_rates,
						re.material_uuid
					FROM store.receive r
					LEFT JOIN store.receive_entry re ON r.uuid = re.receive_uuid
					WHERE
						re.created_at IS NOT NULL
						AND re.created_at BETWEEN ${start_date}::TIMESTAMP AND ${end_date}::TIMESTAMP + interval '23 hours 59 minutes 59 seconds' AND r.convention_rate > 1
					GROUP BY
						re.material_uuid
				) avg ON m.uuid = avg.material_uuid
				LEFT JOIN commercial.lc ON material_quantity_total.lc_uuid = commercial.lc.uuid 
            `;

	const resultPromise = db.execute(query);

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select_all',
			message: 'Store Material Report',
		};
		res.status(200).json({ toast, data: data?.rows });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
