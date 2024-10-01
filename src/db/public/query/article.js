import { desc, eq } from 'drizzle-orm';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';

import { article } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const articlePromise = db
		.insert(article)
		.values(req.body)
		.returning({ insertedName: article.name });

	try {
		const data = await articlePromise;
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

	const articlePromise = db
		.update(article)
		.set(req.body)
		.where(eq(article.uuid, req.params.uuid))
		.returning({ updatedName: article.name });

	try {
		const data = await articlePromise;
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

	const articlePromise = db
		.remove(article)
		.where(eq(article.uuid, req.params.uuid))
		.returning({ removedName: article.name });

	try {
		const data = await articlePromise;
		const toast = {
			status: 200,
			type: 'remove',
			message: `${data[0].removedName} removed`,
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
	if (!(await validateRequest(req, next))) return;

	const articlePromise = db
		.select({
			uuid: article.uuid,
			name: article.name,
			created_by: article.created_by,
			created_by_name: hrSchema.users.name,
			created_at: article.created_at,
			updated_at: article.updated_at,
			remarks: article.remarks,
		})
		.from(article)
		.leftJoin(hrSchema.users, eq(article.created_by, hrSchema.users.uuid))
		.orderBy(desc(article.created_at));

	const toast = {
		status: 200,
		type: 'select all',
		message: 'article list',
	};

	handleResponse({ promise: articlePromise, res, next, ...toast });
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const articlePromise = db
		.select({
			uuid: article.uuid,
			name: article.name,
			created_by: article.created_by,
			created_by_name: hrSchema.users.name,
			created_at: article.created_at,
			updated_at: article.updated_at,
			remarks: article.remarks,
		})
		.from(article)
		.leftJoin(hrSchema.users, eq(article.created_by, hrSchema.users.uuid))
		.where(eq(article.uuid, req.params.uuid));

	try {
		const data = await articlePromise;
		const toast = {
			status: 200,
			type: 'select one',
			message: 'article details',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
