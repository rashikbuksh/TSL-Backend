import { desc, eq, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { nanoid } from '../../../lib/nanoid.js';
import { createApi } from '../../../util/api.js';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import {
	cost_center,
	currency,
	ledger,
	voucher_entry_cost_center,
} from '../../acc/schema.js';
import * as commercialSchema from '../../commercial/schema.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';
import { decimalToNumber } from '../../variables.js';
import { receive, receive_entry, vendor } from '../schema.js';

const lcProperties = alias(vendor, 'lcProperties');

const purchaseCostCenter = alias(cost_center, 'purchase_cost_center');
const vendorCostCenter = alias(cost_center, 'vendor_cost_center');
const purchaseVoucherEntryCostCenter = alias(
	voucher_entry_cost_center,
	'purchase_voucher_entry_cost_center'
);
const vendorVoucherEntryCostCenter = alias(
	voucher_entry_cost_center,
	'vendor_voucher_entry_cost_center'
);

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const receivePromise = db
		.insert(receive)
		.values(req.body)
		.returning({
			insertedName: sql`concat('R', to_char(receive.created_at, 'YY'), '-', LPAD(receive.id::text, 4, '0'))`,
		});

	try {
		// Insert receive first to get the generated ID
		const receiveData = await receivePromise;
		const generatedReceiveId = receiveData[0].insertedName;

		const ledgerData = db
			.select({ uuid: ledger.uuid })
			.from(ledger)
			.where(eq(ledger.identifier, 'store'));

		const ledgerResult = await ledgerData;

		// Now insert into cost_center using the generated ID
		const costCenterPromise = db
			.insert(cost_center)
			.values({
				uuid: nanoid(),
				name: generatedReceiveId, // Use the exact generated ID from receive
				ledger_uuid: ledgerResult[0]?.uuid || null,
				table_name: 'store.receive',
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
			message: `${generatedReceiveId} AND Cost Center ${costCenterData[0].insertedName} created`,
		};
		return await res.status(201).json({ toast, data: receiveData });
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
		.returning({
			updatedName: sql`concat('R', to_char(receive.created_at, 'YY'), '-', LPAD(receive.id::text, 4, '0'))`,
		});

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

	const receiveEntryPromise = db
		.delete(receive_entry)
		.where(eq(receive_entry.receive_uuid, req.params.uuid));

	const receivePromise = db
		.delete(receive)
		.where(eq(receive.uuid, req.params.uuid))
		.returning({
			deletedName: sql`concat('R', to_char(receive.created_at, 'YY'), '-', LPAD(receive.id::text, 4, '0'))`,
		});

	try {
		await receiveEntryPromise;
		const data = await receivePromise;
		const toast = {
			status: 200,
			type: 'delete',
			message: `${data[0].deletedName} deleted`,
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		let customMessage = 'An error occurred while processing your request.';
		if (error.code === '23503') {
			customMessage =
				'Unable to delete Receive: Dependencies exist in other sections';
		}
		await handleError({
			error: {
				...error,
				message: customMessage,
			},
			res,
		});
	}
}

export async function selectAll(req, res, next) {
	if (!(await validateRequest(req, next))) return;
	const receivePromise = db
		.select({
			uuid: receive.uuid,
			id: receive.id,
			receive_id: sql`concat('R', to_char(receive.created_at, 'YY'), '-', LPAD(receive.id::text, 4, '0'))`,
			vendor_uuid: receive.vendor_uuid,
			vendor_name: vendor.name,
			lc_uuid: receive.lc_uuid,
			lc_vendor_uuid: commercialSchema.lc.vendor_uuid,
			lc_vendor_name: lcProperties.name,
			lc_number: commercialSchema.lc.number,
			is_import: receive.is_import,
			commercial_invoice_number: receive.commercial_invoice_number,
			commercial_invoice_value: decimalToNumber(
				receive.commercial_invoice_value
			),
			convention_rate: decimalToNumber(receive.convention_rate),
			created_by: receive.created_by,
			created_by_name: hrSchema.users.name,
			created_at: receive.created_at,
			updated_at: receive.updated_at,
			remarks: receive.remarks,
			receive_entry_count: decimalToNumber(sql`(
				select count(*)
				from store.receive_entry
				where store.receive_entry.receive_uuid = receive.uuid
			)`),
			inventory_date: receive.inventory_date,
			currency_uuid: receive.currency_uuid,
			currency: currency.currency,
			currency_name: currency.currency_name,
			currency_symbol: currency.symbol,
			type: receive.type,
		})
		.from(receive)
		.leftJoin(hrSchema.users, eq(receive.created_by, hrSchema.users.uuid))
		.leftJoin(vendor, eq(receive.vendor_uuid, vendor.uuid))
		.leftJoin(
			commercialSchema.lc,
			eq(receive.lc_uuid, commercialSchema.lc.uuid)
		)
		.leftJoin(
			lcProperties,
			eq(commercialSchema.lc.vendor_uuid, lcProperties.uuid)
		)
		.leftJoin(currency, eq(receive.currency_uuid, currency.uuid))
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
			id: receive.id,
			receive_id: sql`concat('R', to_char(receive.created_at, 'YY'), '-', LPAD(receive.id::text, 4, '0'))`,
			vendor_uuid: receive.vendor_uuid,
			vendor_name: vendor.name,
			lc_uuid: receive.lc_uuid,
			lc_vendor_uuid: commercialSchema.lc.vendor_uuid,
			lc_vendor_name: lcProperties.name,
			lc_number: commercialSchema.lc.number,
			is_import: receive.is_import,
			commercial_invoice_number: receive.commercial_invoice_number,
			commercial_invoice_value: decimalToNumber(
				receive.commercial_invoice_value
			),
			convention_rate: decimalToNumber(receive.convention_rate),
			created_by: receive.created_by,
			created_by_name: hrSchema.users.name,
			created_at: receive.created_at,
			updated_at: receive.updated_at,
			remarks: receive.remarks,
			inventory_date: receive.inventory_date,
			currency_uuid: receive.currency_uuid,
			currency: currency.currency,
			currency_name: currency.currency_name,
			currency_symbol: currency.symbol,
			type: receive.type,
		})
		.from(receive)
		.leftJoin(hrSchema.users, eq(receive.created_by, hrSchema.users.uuid))
		.leftJoin(vendor, eq(receive.vendor_uuid, vendor.uuid))
		.leftJoin(
			commercialSchema.lc,
			eq(receive.lc_uuid, commercialSchema.lc.uuid)
		)
		.leftJoin(
			lcProperties,
			eq(commercialSchema.lc.vendor_uuid, lcProperties.uuid)
		)
		.leftJoin(currency, eq(receive.currency_uuid, currency.uuid))
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

export async function selectAllReceiveWithEntry(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const resultPromise = db
		.select({
			uuid: receive.uuid,
			receive_id: sql`CONCAT('R', to_char(receive.created_at, 'YY'), '-', LPAD(receive.id::text, 4, '0'))`,
			vendor_uuid: receive.vendor_uuid,
			vendor_name: vendor.name,
			total_price: sql`SUM(receive_entry.price::float8)`,
			created_at: receive.created_at,
			currency_uuid: sql`COALESCE(${receive.currency_uuid}, 'bz7Xt8T3rfjDAQT')`,
			currency: currency.currency,
			currency_name: currency.currency_name,
			currency_symbol: currency.symbol,
			purchase_cost_center_uuid: purchaseCostCenter.uuid,
			vendor_cost_center_uuid: vendorCostCenter.uuid,
			purchase_cost_center_amount: purchaseVoucherEntryCostCenter.amount,
			vendor_cost_center_amount: vendorVoucherEntryCostCenter.amount,
			type: receive.type,
		})
		.from(receive)
		.leftJoin(vendor, eq(receive.vendor_uuid, vendor.uuid))
		.leftJoin(receive_entry, eq(receive.uuid, receive_entry.receive_uuid))
		.leftJoin(
			currency,
			eq(
				sql`COALESCE(${receive.currency_uuid}, 'bz7Xt8T3rfjDAQT')`,
				currency.uuid
			)
		)
		.leftJoin(
			purchaseCostCenter,
			eq(receive.uuid, purchaseCostCenter.table_uuid)
		)
		.leftJoin(
			vendorCostCenter,
			eq(vendorCostCenter.table_uuid, receive.vendor_uuid)
		)
		.leftJoin(
			purchaseVoucherEntryCostCenter,
			eq(
				purchaseVoucherEntryCostCenter.cost_center_uuid,
				purchaseCostCenter.uuid
			)
		)
		.leftJoin(
			vendorVoucherEntryCostCenter,
			eq(
				vendorVoucherEntryCostCenter.cost_center_uuid,
				vendorCostCenter.uuid
			)
		)
		.groupBy(
			receive.uuid,
			receive.id,
			receive.created_at,
			vendor.uuid,
			vendor.name,
			receive.currency_uuid,
			currency.uuid,
			currency.currency,
			currency.currency_name,
			currency.symbol,
			purchaseCostCenter.uuid,
			vendorCostCenter.uuid,
			purchaseVoucherEntryCostCenter.amount,
			vendorVoucherEntryCostCenter.amount,
			receive.type
		)
		.orderBy(desc(receive.id));

	// if (s_type) {
	// 	resultPromise.where(eq(receive.store_type, s_type));
	// }
	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select_all',
			message: 'Receive list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		await handleError({ error, res });
	}
}
