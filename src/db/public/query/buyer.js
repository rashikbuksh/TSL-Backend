import { desc, eq } from 'drizzle-orm';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';

import { buyer } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const buyerPromise = db
		.insert(buyer)
		.values(req.body)
		.returning({ insertedName: buyer.name });

	try {
		const data = await buyerPromise;
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

	const buyerPromise = db
		.update(buyer)
		.set(req.body)
		.where(eq(buyer.uuid, req.params.uuid))
		.returning({ updatedName: buyer.name });

	try {
		const data = await buyerPromise;
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

	const buyerPromise = db
		.remove(buyer)
		.where(eq(buyer.uuid, req.params.uuid))
		.returning({ removedName: buyer.name });

	try {
		const data = await buyerPromise;
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

	const buyerPromise = db
		.select({
			uuid: buyer.uuid,
			name: buyer.name,
			created_by: buyer.created_by,
			created_by_name: hrSchema.users.name,
			created_at: buyer.created_at,
			updated_at: buyer.updated_at,
			remarks: buyer.remarks,
		})
		.from(buyer)
		.leftJoin(hrSchema.users, eq(buyer.created_by, hrSchema.users.uuid))
		.orderBy(desc(buyer.created_at));

	const toast = {
		status: 200,
		type: 'select',
		message: 'buyer select all',
	};

	handleResponse({ promise: buyerPromise, res, next, ...toast });
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const buyerPromise = db
		.select({
			uuid: buyer.uuid,
			name: buyer.name,
			created_by: buyer.created_by,
			created_by_name: hrSchema.users.name,
			created_at: buyer.created_at,
			updated_at: buyer.updated_at,
			remarks: buyer.remarks,
		})
		.from(buyer)
		.leftJoin(hrSchema.users, eq(buyer.created_by, hrSchema.users.uuid))
		.where(eq(buyer.uuid, req.params.uuid));

	try {
		const data = await buyerPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'buyer select one',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
