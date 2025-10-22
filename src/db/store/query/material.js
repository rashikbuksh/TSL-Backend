import { desc, eq } from 'drizzle-orm';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';
import * as publicSchema from '../../public/schema.js';
import { decimalToNumber } from '../../variables.js';
import { material, material_name, unit, color, size } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const materialPromise = db
		.insert(material)
		.values(req.body)
		.returning({ insertedUuid: material.uuid });

	try {
		const data = await materialPromise;
		const materialPromised = db
			.select({
				name: material_name.name,
			})
			.from(material_name)
			.leftJoin(material, eq(material_name.uuid, material.name_uuid))
			.where(eq(material.uuid, data[0].insertedUuid));

		const materialData = await materialPromised;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${materialData[0].name} - ${materialData[0].id} inserted`,
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
		.where(eq(material.uuid, req.params.uuid))
		.returning({ updatedUuid: material.uuid });

	try {
		const data = await materialPromise;
		const materialPromised = db
			.select({
				name: material_name.name,
			})
			.from(material_name)
			.leftJoin(material, eq(material_name.uuid, material.name_uuid))
			.where(eq(material.uuid, data[0].updatedUuid));
		const materialData = await materialPromised;
		const toast = {
			status: 200,
			type: 'update',
			message: `${materialData[0].name} updated`,
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
		.where(eq(material.uuid, req.params.uuid))
		.returning({
			deletedUuid: material.uuid,
			name_uuid: material.name_uuid,
		});

	try {
		const data = await materialPromise;
		const materialPromised = db
			.select({
				name: material_name.name,
			})
			.from(material_name)
			.where(eq(material_name.uuid, data[0].name_uuid));
		const materialData = await materialPromised;
		const toast = {
			status: 200,
			type: 'delete',
			message: `${materialData[0].name} deleted`,
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
			id: material.id,
			material_id: sql`concat('M', to_char(material.created_at, 'YY'), '-', (material.id::text))`,
			uuid: material.uuid,
			article_uuid: material.article_uuid,
			article_name: publicSchema.article.name,
			buyer_name: publicSchema.buyer.name,
			category_uuid: material.category_uuid,
			category_name: publicSchema.category.name,
			name_uuid: material.name_uuid,
			material_name: material_name.name,
			color_uuid: material.color_uuid,
			color_name: color.name,
			size_uuid: material.size_uuid,
			size_name: size.name,
			quantity: decimalToNumber(material.quantity),
			unit_uuid: material.unit_uuid,
			unit_name: unit.name,
			created_by: material.created_by,
			created_by_name: hrSchema.users.name,
			created_at: material.created_at,
			updated_at: material.updated_at,
			remarks: material.remarks,
		})
		.from(material)
		.leftJoin(hrSchema.users, eq(material.created_by, hrSchema.users.uuid))
		.leftJoin(
			publicSchema.article,
			eq(material.article_uuid, publicSchema.article.uuid)
		)
		.leftJoin(
			publicSchema.category,
			eq(material.category_uuid, publicSchema.category.uuid)
		)
		.leftJoin(
			publicSchema.buyer,
			eq(publicSchema.article.buyer_uuid, publicSchema.buyer.uuid)
		)
		.leftJoin(material_name, eq(material.name_uuid, material_name.uuid))
		.leftJoin(color, eq(material.color_uuid, color.uuid))
		.leftJoin(size, eq(material.size_uuid, size.uuid))
		.leftJoin(unit, eq(material.unit_uuid, unit.uuid))
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
			id: material.id,
			material_id: sql`concat('M', to_char(material.created_at, 'YY'), '-', (material.id::text))`,
			uuid: material.uuid,
			article_uuid: material.article_uuid,
			article_name: publicSchema.article.name,
			buyer_name: publicSchema.buyer.name,
			category_uuid: material.category_uuid,
			category_name: publicSchema.category.name,
			name_uuid: material.name_uuid,
			material_name: material_name.name,
			color_uuid: material.color_uuid,
			color_name: color.name,
			size_uuid: material.size_uuid,
			size_name: size.name,
			quantity: decimalToNumber(material.quantity),
			unit_uuid: material.unit_uuid,
			unit_name: unit.name,
			created_by: material.created_by,
			created_by_name: hrSchema.users.name,
			created_at: material.created_at,
			updated_at: material.updated_at,
			remarks: material.remarks,
		})
		.from(material)
		.leftJoin(hrSchema.users, eq(material.created_by, hrSchema.users.uuid))
		.leftJoin(
			publicSchema.article,
			eq(material.article_uuid, publicSchema.article.uuid)
		)
		.leftJoin(
			publicSchema.category,
			eq(material.category_uuid, publicSchema.category.uuid)
		)
		.leftJoin(
			publicSchema.buyer,
			eq(publicSchema.article.buyer_uuid, publicSchema.buyer.uuid)
		)
		.leftJoin(material_name, eq(material.name_uuid, material_name.uuid))
		.leftJoin(color, eq(material.color_uuid, color.uuid))
		.leftJoin(size, eq(material.size_uuid, size.uuid))
		.leftJoin(unit, eq(material.unit_uuid, unit.uuid))
		.where(eq(material.uuid, req.params.uuid));

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
