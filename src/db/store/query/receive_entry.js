import { desc, eq, sql, and } from 'drizzle-orm';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';
import * as publicSchema from '../../public/schema.js';
import { decimalToNumber } from '../../variables.js';
import { nanoid } from 'nanoid';
import {
	color,
	material,
	material_name,
	receive,
	receive_entry,
	size,
	unit,
	vendor,
} from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	console.log('req.body', req.body);
	let new_material_uuid = nanoid(15);
	console.log('new_material_uuid', new_material_uuid);
	const {
		quantity,
		created_by,
		created_at,
		updated_at,
		remarks,
		article_uuid,
		category_uuid,
		name_uuid,
		color_uuid,
		unit_uuid,
		size_uuid,
	} = req.body;

	// check if material exists with these parameters article_uuid, category_uuid, name_uuid, color_uuid, unit_uuid, size_uuid,
	const materialPromise = db
		.select({
			uuid: material.uuid,
		})
		.from(material)
		.where(
			and(
				eq(material.article_uuid, article_uuid),
				eq(material.category_uuid, category_uuid),
				eq(material.name_uuid, name_uuid),
				eq(material.color_uuid, color_uuid),
				eq(material.unit_uuid, unit_uuid),
				eq(material.size_uuid, size_uuid)
			)
		);

	const materialResult = await materialPromise;

	let material_uuid = new_material_uuid;

	console.log('materialResult', materialResult);
	console.log('materialResult.length', materialResult.length);

	if (materialResult.length === 0) {
		const materialInsertPromise = db
			.insert(material)
			.values({
				uuid: new_material_uuid,
				article_uuid,
				category_uuid,
				name_uuid,
				color_uuid,
				size_uuid,
				quantity,
				unit_uuid,
				created_by,
				created_at,
				updated_at,
				remarks,
			})
			.returning({ insertedUuid: material.uuid });

		const materialInsertResult = await materialInsertPromise;
		material_uuid = materialInsertResult[0].insertedUuid;
	}

	const receive_entry_values = {
		uuid: req.body.uuid,
		receive_uuid: req.body.receive_uuid,
		material_uuid:
			materialResult.length === 0
				? new_material_uuid
				: materialResult[0].uuid,
		quantity,
		price: req.body.price,
		created_by,
		created_at,
		updated_at,
		remarks,
	};

	const receive_entryPromise = db
		.insert(receive_entry)
		.values(receive_entry_values)
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

	const {
		uuid,
		quantity,
		created_by,
		created_at,
		updated_at,
		remarks,
		article_uuid,
		category_uuid,
		name_uuid,
		color_uuid,
		unit_uuid,
		size_uuid,
		new_material_uuid,
	} = req.body;

	// update the existing material with these parameters article_uuid, category_uuid, name_uuid, color_uuid, unit_uuid, size_uuid,

	const materialPromise = db
		.select(material.uuid)
		.from(material)
		.where(
			eq(material.article_uuid, article_uuid),
			eq(material.category_uuid, category_uuid),
			eq(material.name_uuid, name_uuid),
			eq(material.color_uuid, color_uuid),
			eq(material.unit_uuid, unit_uuid),
			eq(material.size_uuid, size_uuid)
		);

	const materialResult = await materialPromise;

	let material_uuid = new_material_uuid;

	if (materialResult.length === 0) {
		const materialInsertPromise = db
			.insert(material)
			.values({
				uuid: new_material_uuid,
				article_uuid,
				category_uuid,
				name_uuid,
				color_uuid,
				unit_uuid,
				size_uuid,
				quantity,
				created_by,
				created_at,
				updated_at,
				remarks,
			})
			.returning({ insertedUuid: material.uuid });

		const materialInsertResult = await materialInsertPromise;
		material_uuid = materialInsertResult[0].insertedUuid;
	}

	const receive_entry_values = {
		receive_uuid: req.params.receive_uuid,
		material_uuid:
			materialResult.length === 0
				? new_material_uuid
				: materialResult[0].uuid,
		quantity,
		price: req.body.price,
		created_by,
		created_at,
		updated_at,
		remarks,
	};

	const receive_entryPromise = db
		.update(receive_entry)
		.set(receive_entry_values)
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
	if (!(await validateRequest(req, next))) return;

	const resultPromise = db
		.select({
			uuid: receive_entry.uuid,
			receive_uuid: receive_entry.receive_uuid,
			vendor_uuid: receive.vendor_uuid,
			vendor_name: vendor.name,
			material_uuid: receive_entry.material_uuid,
			article_uuid: material.article_uuid,
			article_name: publicSchema.article.name,
			category_uuid: material.category_uuid,
			category_name: publicSchema.category.name,
			name_uuid: material.name_uuid,
			material_name: material_name.name,
			color_uuid: material.color_uuid,
			color_name: color.name,
			unit_uuid: material.unit_uuid,
			unit_name: unit.name,
			size_uuid: material.size_uuid,
			size_name: size.name,
			quantity: decimalToNumber(receive_entry.quantity),
			price: decimalToNumber(receive_entry.price),
			created_at: receive_entry.created_at,
			updated_at: receive_entry.updated_at,
			remarks: receive_entry.remarks,
		})
		.from(receive_entry)
		.leftJoin(receive, eq(receive_entry.receive_uuid, receive.uuid))
		.leftJoin(vendor, eq(receive.vendor_uuid, vendor.uuid))
		.leftJoin(material, eq(receive_entry.material_uuid, material.uuid))
		.leftJoin(material_name, eq(material.name_uuid, material_name.uuid))
		.leftJoin(color, eq(material.color_uuid, color.uuid))
		.leftJoin(unit, eq(material.unit_uuid, unit.uuid))
		.leftJoin(size, eq(material.size_uuid, size.uuid))
		.leftJoin(
			publicSchema.article,
			eq(material.article_uuid, publicSchema.article.uuid)
		)
		.leftJoin(
			publicSchema.category,
			eq(material.category_uuid, publicSchema.category.uuid)
		)
		.orderBy(desc(receive_entry.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'receive_entry list',
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
	if (!(await validateRequest(req, next))) return;

	const resultPromise = db
		.select({
			uuid: receive_entry.uuid,
			receive_uuid: receive_entry.receive_uuid,
			vendor_uuid: receive.vendor_uuid,
			vendor_name: vendor.name,
			material_uuid: receive_entry.material_uuid,
			article_uuid: material.article_uuid,
			article_name: publicSchema.article.name,
			category_uuid: material.category_uuid,
			category_name: publicSchema.category.name,
			name_uuid: material.name_uuid,
			material_name: material_name.name,
			color_uuid: material.color_uuid,
			color_name: color.name,
			unit_uuid: material.unit_uuid,
			unit_name: unit.name,
			size_uuid: material.size_uuid,
			size_name: size.name,
			quantity: decimalToNumber(receive_entry.quantity),
			price: decimalToNumber(receive_entry.price),
			created_at: receive_entry.created_at,
			updated_at: receive_entry.updated_at,
			remarks: receive_entry.remarks,
		})
		.from(receive_entry)
		.leftJoin(receive, eq(receive_entry.receive_uuid, receive.uuid))
		.leftJoin(vendor, eq(receive.vendor_uuid, vendor.uuid))
		.leftJoin(material, eq(receive_entry.material_uuid, material.uuid))
		.leftJoin(material_name, eq(material.name_uuid, material_name.uuid))
		.leftJoin(color, eq(material.color_uuid, color.uuid))
		.leftJoin(unit, eq(material.unit_uuid, unit.uuid))
		.leftJoin(size, eq(material.size_uuid, size.uuid))
		.leftJoin(
			publicSchema.article,
			eq(material.article_uuid, publicSchema.article.uuid)
		)
		.leftJoin(
			publicSchema.category,
			eq(material.category_uuid, publicSchema.category.uuid)
		)
		.where(eq(receive_entry.uuid, req.params.uuid));

	try {
		const data = await resultPromise;
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

export async function selectByReceiveUuid(req, res, next) {
	const receive_entryPromise = db
		.select({
			uuid: receive_entry.uuid,
			receive_uuid: receive_entry.receive_uuid,
			vendor_uuid: receive.vendor_uuid,
			vendor_name: vendor.name,
			material_uuid: receive_entry.material_uuid,
			article_uuid: material.article_uuid,
			article_name: publicSchema.article.name,
			category_uuid: material.category_uuid,
			category_name: publicSchema.category.name,
			name_uuid: material.name_uuid,
			material_name: material_name.name,
			color_uuid: material.color_uuid,
			color_name: color.name,
			unit_uuid: material.unit_uuid,
			unit_name: unit.name,
			size_uuid: material.size_uuid,
			size_name: size.name,
			quantity: decimalToNumber(receive_entry.quantity),
			price: decimalToNumber(receive_entry.price),
			created_at: receive_entry.created_at,
			updated_at: receive_entry.updated_at,
			remarks: receive_entry.remarks,
		})
		.from(receive_entry)
		.leftJoin(receive, eq(receive_entry.receive_uuid, receive.uuid))
		.leftJoin(vendor, eq(receive.vendor_uuid, vendor.uuid))
		.leftJoin(material, eq(receive_entry.material_uuid, material.uuid))
		.leftJoin(material_name, eq(material.name_uuid, material_name.uuid))
		.leftJoin(color, eq(material.color_uuid, color.uuid))
		.leftJoin(unit, eq(material.unit_uuid, unit.uuid))
		.leftJoin(size, eq(material.size_uuid, size.uuid))
		.leftJoin(
			publicSchema.article,
			eq(material.article_uuid, publicSchema.article.uuid)
		)
		.leftJoin(
			publicSchema.category,
			eq(material.category_uuid, publicSchema.category.uuid)
		)
		.where(eq(receive_entry.receive_uuid, req.params.receive_uuid))
		.orderBy(desc(receive_entry.created_at));

	try {
		const data = await receive_entryPromise;

		const toast = {
			status: 200,
			type: 'select all',
			message: 'receive_entry list',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
