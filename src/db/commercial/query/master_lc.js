import { desc, eq } from 'drizzle-orm';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';
import { decimalToNumber } from '../../variables.js';

import { master_lc } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const master_lcPromise = db
		.insert(master_lc)
		.values(req.body)
		.returning({ insertedUuid: master_lc.uuid });

	try {
		const data = await master_lcPromise;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedUuid} inserted`,
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

	const master_lcPromise = db
		.update(master_lc)
		.set(req.body)
		.where(eq(master_lc.uuid, req.params.uuid))
		.returning({ updatedUuid: master_lc.uuid });

	try {
		const data = await master_lcPromise;
		const toast = {
			status: 200,
			type: 'update',
			message: `${data[0].updatedUuid} updated`,
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

	const master_lcPromise = db
		.delete(master_lc)
		.where(eq(master_lc.uuid, req.params.uuid))
		.returning({ deletedUuid: master_lc.uuid });

	try {
		const data = await master_lcPromise;
		const toast = {
			status: 200,
			type: 'delete',
			message: `${data[0].deletedUuid} deleted`,
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
	const master_lcPromise = db
		.select({
			uuid: master_lc.uuid,
			number: master_lc.number,
			date: master_lc.date,
			created_by: master_lc.created_by,
			created_by_name: hrSchema.users.name,
			created_at: master_lc.created_at,
			updated_at: master_lc.updated_at,
			remarks: master_lc.remarks,
		})
		.from(master_lc)
		.leftJoin(hrSchema.users, eq(master_lc.created_by, hrSchema.users.uuid))
		.orderBy(desc(master_lc.created_at));

	const toast = {
		status: 200,
		type: 'select all',
		message: 'Master_lc list',
	};
	handleResponse({ promise: master_lcPromise, res, next, ...toast });
}

export async function select(req, res, next) {
	const master_lcPromise = db
		.select({
			uuid: master_lc.uuid,
			number: master_lc.number,
			date: master_lc.date,
			created_by: master_lc.created_by,
			created_by_name: hrSchema.users.name,
			created_at: master_lc.created_at,
			updated_at: master_lc.updated_at,
			remarks: master_lc.remarks,
		})
		.from(master_lc)
		.leftJoin(hrSchema.users, eq(master_lc.created_by, hrSchema.users.uuid))
		.where(eq(master_lc.uuid, req.params.uuid));

	try {
		const data = await master_lcPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Master_lc',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
