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
