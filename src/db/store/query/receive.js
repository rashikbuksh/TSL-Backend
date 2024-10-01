import { desc, eq } from 'drizzle-orm';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import { createApi } from '../../../util/api.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';
import * as commercialSchema from '../../commercial/schema.js';

import { receive, vendor } from '../schema.js';

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
		.where(eq(receive.uuid, req.params.uuid))
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
		.where(eq(receive.uuid, req.params.uuid))
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
	if (!(await validateRequest(req, next))) return;
	const receivePromise = db
		.select({
			uuid: receive.uuid,
			vendor_uuid: receive.vendor_uuid,
			vendor_name: vendor.name,
			lc_uuid: receive.lc_uuid,
			lc_number: commercialSchema.lc.number,
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
		.leftJoin(vendor, eq(receive.vendor_uuid, vendor.uuid))
		.leftJoin(
			commercialSchema.lc,
			eq(receive.lc_uuid, commercialSchema.lc.uuid)
		)
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
			vendor_name: vendor.name,
			lc_uuid: receive.lc_uuid,
			lc_number: commercialSchema.lc.number,
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
		.leftJoin(vendor, eq(receive.vendor_uuid, vendor.uuid))
		.leftJoin(
			commercialSchema.lc,
			eq(receive.lc_uuid, commercialSchema.lc.uuid)
		)
		.where(eq(receive.uuid, req.params.uuid));

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

export async function selectReceiveEntryDetails(req, res, next) {
	if (!validateRequest(req, next)) return;

	const { receive_uuid } = req.params;
	try {
		const api = await createApi(req);
		const fetchData = async (endpoint) =>
			await api
				.get(`${endpoint}/${receive_uuid}`)
				.then((response) => response);

		const [receive, receive_entry] = await Promise.all([
			fetchData('/store/receive'),
			fetchData('/store/receive-entry/by'),
		]);

		const response = {
			...receive?.data?.data,
			receive_entry: receive_entry?.data?.data || [],
		};

		const toast = {
			status: 200,
			type: 'select',
			msg: 'receive_entry Details Full',
		};

		res.status(200).json({ toast, data: response });
	} catch (error) {
		await handleError({ error, res });
	}
}
