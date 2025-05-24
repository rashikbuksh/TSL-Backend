import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';

import { material_name } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const material_namePromise = db
		.insert(material_name)
		.values(req.body)
		.returning({ insertedName: material_name.name });

	try {
		const data = await material_namePromise;
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

	const material_namePromise = db
		.update(material_name)
		.set(req.body)
		.where(eq(material_name.uuid, req.params.uuid))
		.returning({ updatedName: material_name.name });

	try {
		const data = await material_namePromise;
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
	const material_namePromise = db
		.delete(material_name)
		.where(eq(material_name.uuid, req.params.uuid))
		.returning({ deletedName: material_name.name });

	try {
		const data = await material_namePromise;
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
	const material_namePromise = db
		.select({
			uuid: material_name.uuid,
			name: material_name.name,
			created_by: material_name.created_by,
			created_by_name: hrSchema.users.name,
			created_at: material_name.created_at,
			updated_at: material_name.updated_at,
			remarks: material_name.remarks,
		})
		.from(material_name)
		.leftJoin(
			hrSchema.users,
			eq(material_name.created_by, hrSchema.users.uuid)
		)
		.orderBy(desc(material_name.created_at));

	try {
		const data = await material_namePromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'All material_name list',
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
	const material_namePromise = db
		.select({
			uuid: material_name.uuid,
			name: material_name.name,
			created_by: material_name.created_by,
			created_by_name: hrSchema.users.name,
			created_at: material_name.created_at,
			updated_at: material_name.updated_at,
			remarks: material_name.remarks,
		})
		.from(material_name)
		.leftJoin(
			hrSchema.users,
			eq(material_name.created_by, hrSchema.users.uuid)
		)
		.where(eq(material_name.uuid, req.params.uuid));

	try {
		const data = await material_namePromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Material_name select',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
