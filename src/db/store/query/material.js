import { desc, eq } from 'drizzle-orm';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';

import { material } from '../schema.js';
import { article, category } from '@/db/public/schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const materialPromise = db
		.insert(material)
		.values(req.body)
		.returning({ insertedName: material.name });

	try {
		const data = await materialPromise;
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

	const materialPromise = db
		.update(material)
		.set(req.body)
		.where(eq(material.uuid, req.body.uuid))
		.returning({ updatedName: material.name });

	try {
		const data = await materialPromise;
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
	const materialPromise = db
		.delete(material)
		.where(eq(material.uuid, req.body.uuid))
		.returning({ deletedName: material.name });

	try {
		const data = await materialPromise;
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
	const materialPromise = db
		.select({
			uuid: material.uuid,
			article_uuid: material.article_uuid,
			category_uuid: material.category_uuid,
			name: material.name,
			created_by: material.created_by,
			created_by_name: hrSchema.users.name,
			created_at: material.created_at,
			updated_at: material.updated_at,
			remarks: material.remarks,
		})
		.from(material)
		.leftJoin(hrSchema.users, eq(material.created_by, hrSchema.users.uuid))
		.orderBy(desc(material.created_at));

	const toast = {
		status: 200,
		type: 'select all',
		message: 'Material list',
	};

	return handleResponse({
		promise: materialPromise,
		res,
		status: 200,
		message: 'Material list',
	});
}

export async function select(req, res, next) {
	const materialPromise = db
		.select({
			uuid: material.uuid,
			article_uuid: material.article_uuid,
			category_uuid: material.category_uuid,
			name: material.name,
			created_by: material.created_by,
			created_by_name: hrSchema.users.name,
			created_at: material.created_at,
			updated_at: material.updated_at,
			remarks: material.remarks,
		})
		.from(material)
		.leftJoin(hrSchema.users, eq(material.created_by, hrSchema.users.uuid))
		.where(eq(material.uuid, req.body.uuid));

	try {
		const data = await materialPromise;
		const toast = {
			status: 200,
			type: 'select one',
			message: 'Material details',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
