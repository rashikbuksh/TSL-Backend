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
					coalesce(material_quantity_total.total_quantity,0)::float8 as total_quantity,
					coalesce(material_quantity_total.price_bdt,0)::float8 as price_bdt,
					coalesce(material_quantity_total.avg_convention_rate,0)::float8 as avg_convention_rate
				FROM
					store.vendor
				LEFT JOIN (
					SELECT 
						r.vendor_uuid,
						SUM(re.quantity) as total_quantity,
						SUM(re.price * r.convention_rate) as price_bdt,
						SUM(CASE WHEN r.convention_rate > 1 THEN r.convention_rate END ) / COUNT (CASE WHEN r.convention_rate > 1 THEN r.convention_rate END) as avg_convention_rate
					FROM
						store.receive_entry re
						LEFT JOIN store.receive r ON re.receive_uuid = r.uuid
					WHERE 
						re.created_at BETWEEN ${start_date}::TIMESTAMP AND ${end_date}::TIMESTAMP + interval '23 hours 59 minutes 59 seconds'
					GROUP BY
						r.vendor_uuid
				) material_quantity_total ON vendor.uuid = material_quantity_total.vendor_uuid
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
