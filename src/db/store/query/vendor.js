import { desc, eq } from 'drizzle-orm';
import { nanoid } from '../../../lib/nanoid.js';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';

import { vendor } from '../schema.js';
import { ledger, cost_center } from '../../acc/schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const vendorPromise = db
		.insert(vendor)
		.values(req.body)
		.returning({ insertedName: vendor.name });

	try {
		const vendorData = await vendorPromise;
		const ledgerPromise = db
			.select({ uuid: ledger.uuid })
			.from(ledger)
			.where(eq(ledger.name, 'Trade Payable'));

		const ledgerData = await ledgerPromise;

		const costCenterPromise = db
			.insert(cost_center)
			.values({
				uuid: nanoid(),
				name: req.body.name, // Use the exact generated ID from description
				ledger_uuid: ledgerData[0]?.uuid,
				table_name: 'vendor',
				table_uuid: req.body.uuid,
				invoice_no: null,
				created_at: req.body.created_at,
				created_by: req.body.created_by,
				updated_by: req.body.updated_by || null,
				updated_at: req.body.updated_at || null,
				remarks: req.body.remarks || null,
			})
			.returning({ insertedName: cost_center.name });

		const costCenterData = await costCenterPromise;

		const toast = {
			status: 201,
			type: 'insert',
			message: `${vendorData[0].insertedId} AND ${costCenterData[0].insertedName} created`,
		};
		return await res.status(201).json({ toast, data: vendorData });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const vendorPromise = db
		.update(vendor)
		.set(req.body)
		.where(eq(vendor.uuid, req.params.uuid))
		.returning({ updatedName: vendor.name });

	try {
		const data = await vendorPromise;
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

	const vendorPromise = db
		.delete(vendor)
		.where(eq(vendor.uuid, req.params.uuid))
		.returning({ deletedName: vendor.name });

	try {
		const data = await vendorPromise;
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
	const vendorPromise = db
		.select({
			uuid: vendor.uuid,
			name: vendor.name,
			person: vendor.person,
			phone: vendor.phone,
			address: vendor.address,
			created_by: vendor.created_by,
			created_by_name: hrSchema.users.name,
			created_at: vendor.created_at,
			updated_at: vendor.updated_at,
			remarks: vendor.remarks,
		})
		.from(vendor)
		.leftJoin(hrSchema.users, eq(vendor.created_by, hrSchema.users.uuid))
		.orderBy(desc(vendor.created_at));

	const toast = {
		status: 200,
		type: 'select all',
		message: 'vendors list',
	};

	handleResponse({
		promise: vendorPromise,
		res,
		next,
		...toast,
	});
}

export async function select(req, res, next) {
	const vendorPromise = db
		.select({
			uuid: vendor.uuid,
			name: vendor.name,
			person: vendor.person,
			phone: vendor.phone,
			address: vendor.address,
			created_by: vendor.created_by,
			created_by_name: hrSchema.users.name,
			created_at: vendor.created_at,
			updated_at: vendor.updated_at,
			remarks: vendor.remarks,
		})
		.from(vendor)
		.leftJoin(hrSchema.users, eq(vendor.created_by, hrSchema.users.uuid))
		.where(eq(vendor.uuid, req.params.uuid));

	try {
		const data = await vendorPromise;
		const toast = {
			status: 200,
			type: 'select one',
			message: 'vendor details',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
