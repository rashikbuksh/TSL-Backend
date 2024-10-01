import { desc, eq } from 'drizzle-orm';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';

import { issue, material } from '../schema.js';
import { uuid } from 'drizzle-orm/pg-core/index.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const issuePromise = db
		.insert(issue)
		.values(req.body)
		.returning({ insertedUuid: issue.uuid });

	try {
		const data = await issuePromise;
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

	const issuePromise = db
		.update(issue)
		.set(req.body)
		.where(eq(issue.uuid, req.body.uuid))
		.returning({ updatedUuid: issue.uuid });

	try {
		const data = await issuePromise;
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

	const issuePromise = db
		.delete(issue)
		.where(eq(issue.uuid, req.body.uuid))
		.returning({ deletedUuid: issue.uuid });

	try {
		const data = await issuePromise;
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
	const issuePromise = db
		.select({
			uuid: issue.uuid,
			material_uuid: issue.material_uuid,
			quantity: issue.quantity,
			created_by: issue.created_by,
			created_by_name: issue.created_by_name,
			created_at: issue.created_at,
			updated_at: issue.updated_at,
			remarks: issue.remarks,
		})
		.from(issue)
		.leftJoin(hrSchema.users, eq(issue.created_by, hrSchema.users.uuid))
		.orderBy(desc(issue.created_at));

	const toast = {
		status: 200,
		type: 'select All',
		message: ' issues list',
	};

	handleResponse({
		promise: issuePromise,
		res,
		next,
		...toast,
	});
}

export async function select(req, res, next) {
	const issuePromise = db
		.select({
			uuid: issue.uuid,
			material_uuid: issue.material_uuid,
			quantity: issue.quantity,
			created_by: issue.created_by,
			created_by_name: issue.created_by_name,
			created_at: issue.created_at,
			updated_at: issue.updated_at,
			remarks: issue.remarks,
		})
		.from(issue)
		.leftJoin(hrSchema.users, eq(issue.created_by, hrSchema.users.uuid))
		.where(eq(issue.uuid, req.body.uuid));

	try {
		const data = await issuePromise;
		const toast = {
			status: 200,
			type: 'select one',
			message: 'issue details',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
