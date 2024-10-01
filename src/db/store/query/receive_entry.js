import { desc, eq } from 'drizzle-orm';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import hr, * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';

import { material, receive_entry } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const receive_entryPromise = db
		.insert(receive_entry)
		.values(req.body)
		.returning({ insertedUuid: receive_entry.uuid });

	try {
		const data = await receive_entryPromise;
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

	const receive_entryPromise = db
		.update(receive_entry)
		.set(req.body)
		.where(eq(receive_entry.uuid, req.params.uuid))
		.returning({ updatedUuid: receive_entry.uuid });

	try {
		const data = await receive_entryPromise;
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

	const receive_entryPromise = db
		.delete(receive_entry)
		.where(eq(receive_entry.uuid, req.params.uuid))
		.returning({ deletedUuid: receive_entry.uuid });

	try {
		const data = await receive_entryPromise;
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
	const receive_entryPromise = db
		.select({
			uuid: receive_entry.uuid,
			receive_uuid: receive_entry.receive_uuid,
			material_uuid: receive_entry.material_uuid,
			quantity: receive_entry.quantity,
			price: receive_entry.price,
			created_by: receive_entry.created_by,
			created_by_name: hrSchema.users.name,
			created_at: receive_entry.created_at,
			updated_at: receive_entry.updated_at,
			remarks: receive_entry.remarks,
		})
		.from(receive_entry)
		.leftJoin(
			hrSchema.users,
			eq(receive_entry.created_by, hrSchema.users.uuid)
		)
		.orderBy(desc(receive_entry.created_at));
	const toast = {
		status: 200,
		type: 'select all',
		message: 'receive_entry list',
	};

	handleResponse({ promise: receive_entryPromise, res, next, ...toast });
}

export async function select(req, res, next) {
	const receive_entryPromise = db
		.select({
			uuid: receive_entry.uuid,
			receive_uuid: receive_entry.receive_uuid,
			material_uuid: receive_entry.material_uuid,
			quantity: receive_entry.quantity,
			price: receive_entry.price,
			created_by: receive_entry.created_by,
			created_by_name: hrSchema.users.name,
			created_at: receive_entry.created_at,
			updated_at: receive_entry.updated_at,
			remarks: receive_entry.remarks,
		})
		.from(receive_entry)
		.leftJoin(
			hrSchema.users,
			eq(receive_entry.created_by, hrSchema.users.uuid)
		)
		.where(eq(receive_entry.uuid, req.params.uuid))
		.orderBy(desc(receive_entry.created_at));
	try {
		const data = await receive_entryPromise;
		const toast = {
			status: 200,
			type: 'select one',
			message: 'receive_entry details',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
