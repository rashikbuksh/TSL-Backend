import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';

import { color } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const colorPromise = db
		.insert(color)
		.values(req.body)
		.returning({ insertedName: color.name });

	try {
		const data = await colorPromise;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedName} inserted`,
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

	const colorPromise = db
		.update(color)
		.set(req.body)
		.where(eq(color.uuid, req.params.uuid))
		.returning({ updatedName: color.name });

	try {
		const data = await colorPromise;
		const toast = {
			status: 200,
			type: 'update',
			message: `${data[0].updatedName} updated`,
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
	const colorPromise = db
		.delete(color)
		.where(eq(color.uuid, req.params.uuid))
		.returning({ deletedName: color.name });

	try {
		const data = await colorPromise;
		const toast = {
			status: 200,
			type: 'delete',
			message: `${data[0].deletedName} deleted`,
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
	const colorPromise = db
		.select({
			uuid: color.uuid,
			name: color.name,
			created_by: color.created_by,
			created_by_name: hrSchema.users.name,
			created_at: color.created_at,
			updated_at: color.updated_at,
			remarks: color.remarks,
		})
		.from(color)
		.leftJoin(hrSchema.users, eq(color.created_by, hrSchema.users.uuid))
		.orderBy(desc(color.created_at));

	try {
		const data = await colorPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'color list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function select(req, res, next) {
	const colorPromise = db
		.select({
			uuid: color.uuid,
			name: color.name,
			created_by: color.created_by,
			created_by_name: hrSchema.users.name,
			created_at: color.created_at,
			updated_at: color.updated_at,
			remarks: color.remarks,
		})
		.from(color)
		.leftJoin(hrSchema.users, eq(color.created_by, hrSchema.users.uuid))
		.where(eq(color.uuid, req.params.uuid));

	try {
		const data = await colorPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'color select',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
