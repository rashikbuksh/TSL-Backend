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
					SUM(re.quantity * re.price) as total_price_usd,
					SUM(re.quantity * re.price * r.convention_rate) as total_price_bdt
				FROM
					store.receive_entry re
				LEFT JOIN store.receive r ON re.receive_uuid = r.uuid
				LEFT JOIN store.vendor vendor ON r.vendor_uuid = vendor.uuid
				WHERE re.created_at between ${start_date}::TIMESTAMP and ${end_date}::TIMESTAMP + interval '23 hours 59 minutes 59 seconds'
				GROUP BY
					vendor.uuid
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
