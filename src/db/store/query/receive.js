import { desc, eq } from 'drizzle-orm';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';

import { receive } from '../schema.js';
import { uuid } from 'drizzle-orm/pg-core/index.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const receivePromise = db
		.insert(receive)
		.values(req.body)
		.returning({ insertedName: receive.commercial_invoice_number });

	try {
		const data = await receivePromise;
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

	const receivePromise = db
		.update(receive)
		.set(req.body)
		.where(eq(receive.uuid, req.body.uuid))
		.returning({ updatedName: receive.commercial_invoice_number });

	try {
		const data = await receivePromise;
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

	const receivePromise = db
		.delete(receive)
		.where(eq(receive.uuid, req.body.uuid))
		.returning({ deletedName: receive.commercial_invoice_number });

	try {
		const data = await receivePromise;
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
	const receivePromise = db
		.select({
			uuid: receive.uuid,
			vendor_uuid: receive.vendor_uuid,
			lc_uuid: receive.lc_uuid,
			is_import: receive.is_import,
			commercial_invoice_number: receive.commercial_invoice_number,
			commercial_invoice_value: receive.commercial_invoice_value,
			convention_rate: receive.convention_rate,
			created_by: receive.created_by,
			created_by_name: hrSchema.users.name,
			created_at: receive.created_at,
			updated_at: receive.updated_at,
			remarks: receive.remarks,
		})
		.from(receive)
		.leftJoin(hrSchema.users, eq(receive.created_by, hrSchema.users.uuid))
		.orderBy(desc(receive.created_at));

	const toast = {
		status: 200,
		type: 'select all',
		message: 'receive list',
	};

	handleResponse({ promise: receivePromise, res, next, ...toast });
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const receivePromise = db
		.select({
			uuid: receive.uuid,
			vendor_uuid: receive.vendor_uuid,
			lc_uuid: receive.lc_uuid,
			is_import: receive.is_import,
			commercial_invoice_number: receive.commercial_invoice_number,
			commercial_invoice_value: receive.commercial_invoice_value,
			convention_rate: receive.convention_rate,
			created_by: receive.created_by,
			created_by_name: hrSchema.users.name,
			created_at: receive.created_at,
			updated_at: receive.updated_at,
			remarks: receive.remarks,
		})
		.from(receive)
		.leftJoin(hrSchema.users, eq(receive.created_by, hrSchema.users.uuid))
		.where(eq(receive.uuid, req.body.uuid));

	try {
		const data = await receivePromise;
		const toast = {
			status: 200,
			type: 'select one',
			message: 'receive details',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
