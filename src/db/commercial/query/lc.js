import { desc, eq } from 'drizzle-orm';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';
import { decimalToNumber } from '../../variables.js';
import { lc, master_lc } from '../schema.js';
import * as storeSchema from '../../store/schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const lcPromise = db
		.insert(lc)
		.values(req.body)
		.returning({ insertedLcNum: lc.number });

	try {
		const data = await lcPromise;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedLcNum} lc inserted`,
		};
		return await res.status(201).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const lcPromise = db
		.update(lc)
		.set(req.body)
		.where(eq(lc.uuid, req.params.uuid))
		.returning({ updatedLcNum: lc.number });

	try {
		const data = await lcPromise;
		const toast = {
			status: 200,
			type: 'update',
			message: `${data[0].updatedLcNum} lc updated`,
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const lcPromise = db
		.delete(lc)
		.where(eq(lc.uuid, req.params.uuid))
		.returning({ deletedLcNum: lc.number });

	try {
		const data = await lcPromise;
		const toast = {
			status: 200,
			type: 'delete',
			message: `${data[0].deletedLcNum} lc deleted`,
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function selectAll(req, res, next) {
	const lcPromise = db
		.select({
			uuid: lc.uuid,
			number: lc.number,
			date: lc.date,
			master_lc_uuid: lc.master_lc_uuid,
			master_ld_number: master_lc.number,
			vendor_uuid: lc.vendor_uuid,
			vendor_name: storeSchema.vendor.name,
			value: decimalToNumber(lc.value),
			unit: lc.unit,
			lien_bank: lc.lien_bank,
			created_by: lc.created_by,
			created_by_name: hrSchema.users.name,
			created_at: lc.created_at,
			updated_at: lc.updated_at,
			remarks: lc.remarks,
		})
		.from(lc)
		.leftJoin(hrSchema.users, eq(lc.created_by, hrSchema.users.uuid))
		.leftJoin(master_lc, eq(lc.master_lc_uuid, master_lc.uuid))
		.leftJoin(
			storeSchema.vendor,
			eq(lc.vendor_uuid, storeSchema.vendor.uuid)
		)
		.orderBy(desc(lc.created_at));

	const toast = {
		status: 200,
		type: 'select all',
		message: ' LC list',
	};

	handleResponse({ promise: lcPromise, res, next, ...toast });
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const lcPromise = db
		.select({
			uuid: lc.uuid,
			number: lc.number,
			date: lc.date,
			master_lc_uuid: lc.master_lc_uuid,
			master_lc_number: master_lc.number,
			vendor_uuid: lc.vendor_uuid,
			vendor_name: storeSchema.vendor.name,
			value: decimalToNumber(lc.value),
			unit: lc.unit,
			lien_bank: lc.lien_bank,
			created_by: lc.created_by,
			created_by_name: hrSchema.users.name,
			created_at: lc.created_at,
			updated_at: lc.updated_at,
			remarks: lc.remarks,
		})
		.from(lc)
		.leftJoin(hrSchema.users, eq(lc.created_by, hrSchema.users.uuid))
		.leftJoin(master_lc, eq(lc.master_lc_uuid, master_lc.uuid))
		.leftJoin(
			storeSchema.vendor,
			eq(lc.vendor_uuid, storeSchema.vendor.uuid)
		)
		.where(eq(lc.uuid, req.params.uuid));

	try {
		const data = await lcPromise;
		const toast = {
			status: 200,
			type: 'select one',
			message: 'LC details',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
