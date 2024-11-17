import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';

import { unit } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const unitPromise = db
		.insert(unit)
		.values(req.body)
		.returning({ insertedName: unit.name });

	try {
		const data = await unitPromise;
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

	const unitPromise = db
		.update(unit)
		.set(req.body)
		.where(eq(unit.uuid, req.params.uuid))
		.returning({ updatedName: unit.name });

	try {
		const data = await unitPromise;
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
	const unitPromise = db
		.delete(unit)
		.where(eq(unit.uuid, req.params.uuid))
		.returning({ deletedName: unit.name });

	try {
		const data = await unitPromise;
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
	const unitPromise = db
		.select({
			uuid: unit.uuid,
			name: unit.name,
			created_by: unit.created_by,
			created_bby_name: hrSchema.users.name,
			created_at: unit.created_at,
			updated_at: unit.updated_at,
			remarks: unit.remarks,
		})
		.from(unit)
		.leftJoin(hrSchema.users, eq(unit.created_by, hrSchema.users.uuid));

	try {
		const data = await unitPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'unit select all',
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
	const unitPromise = db
		.select({
			uuid: unit.uuid,
			name: unit.name,
			created_by: unit.created_by,
			created_bby_name: hrSchema.users.name,
			created_at: unit.created_at,
			updated_at: unit.updated_at,
			remarks: unit.remarks,
		})
		.from(unit)
		.leftJoin(hrSchema.users, eq(unit.created_by, hrSchema.users.uuid))
		.where(eq(unit.uuid, req.params.uuid));

	try {
		const data = await unitPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'unit select',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
