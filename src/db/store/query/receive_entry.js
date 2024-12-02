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

	// const {
	// 	material_uuid,
	// 	article_uuid,
	// 	category_uuid,
	// 	name_uuid,
	// 	color_uuid,
	// 	unit_uuid,
	// 	size_uuid,
	// 	quantity,
	// 	created_by,
	// 	created_at,
	// 	updated_at,
	// 	remarks,
	// } = req.body;
	// console.log('req.body', req.body);
	// console.log('params', req.params.uuid);
	// update the existing material with these parameters article_uuid, category_uuid, name_uuid, color_uuid, unit_uuid, size_uuid,

	// const materialPromise = db
	// 	.select(material.uuid)
	// 	.from(material)
	// 	.where(
	// 		eq(material.article_uuid, article_uuid),
	// 		eq(material.category_uuid, category_uuid),
	// 		eq(material.name_uuid, name_uuid),
	// 		eq(material.color_uuid, color_uuid),
	// 		eq(material.unit_uuid, unit_uuid),
	// 		eq(material.size_uuid, size_uuid)
	// 	);

	// const materialResult = await materialPromise;

	// let material_uuid = new_material_uuid;
	// const material_values = {
	// 	article_uuid,
	// 	category_uuid,
	// 	name_uuid,
	// 	color_uuid,
	// 	unit_uuid,
	// 	size_uuid,
	// 	quantity,
	// 	created_by,
	// 	created_at,
	// 	updated_at,
	// 	remarks,
	// };
	// console.log('material_values', material_values);
	// console.log('material_uuid', material_uuid);
	// if (materialResult.length === 0) {
	// try {
	// 	const materialUpdatePromise = db
	// 		.update(material)
	// 		.set(material_values)
	// 		.where(eq(material.uuid, material_uuid));
	// 	// Return all columns to verify the update

	// 	const materialUpdateResult = await materialUpdatePromise;
	// 	console.log('materialUpdateResult', materialUpdateResult);

	// 	if (materialUpdateResult.length === 0) {
	// 		console.error('No rows updated in the material table');
	// 	} else {
	// 		console.log('Material table updated successfully');
	// 	}
	// } catch (error) {
	// 	console.error('Error updating material table:', error);
	// }

	// const materialInsertResult = await materialInsertPromise;
	// material_uuid = materialInsertResult[0].insertedUuid;
	//}

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

	console.log('receive_entry_values', receive_entry_values);

	const receive_entryPromise = db
		.update(receive_entry)
		.set(receive_entry_values)
		.where(eq(receive_entry.uuid, req.params.uuid))
		.returning({ updatedUuid: receive_entry.uuid });

	// try {
	// 	const data = await receive_entryPromise;
	// 	console.log('data', data);
	// 	const toast = {
	// 		status: 200,
	// 		type: 'update',
	// 		message: `${data[0].updatedUuid} updated`,
	// 	};
	// 	return await res.status(200).json({ toast, data });
	// } catch (error) {
	// 	await handleError({
	// 		error,
	// 		res,
	// 	});
	// }
	try {
		const data = await receive_entryPromise;
		console.log('data', data);

		if (data && data.length > 0) {
			const toast = {
				status: 200,
				type: 'update',
				message: `${data[0].updatedUuid} updated`,
			};
			return await res.status(200).json({ toast, data });
		} else {
			const toast = {
				status: 404,
				type: 'update',
				message: 'No entry found to update',
			};
			return await res.status(404).json({ toast });
		}
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
			receive_id: sql`concat('R', to_char(receive.created_at, 'YY'), '-', LPAD(receive.id::text, 4, '0'))`,
			vendor_uuid: receive.vendor_uuid,
			vendor_name: vendor.name,
			material_uuid: receive_entry.material_uuid,
			article_uuid: material.article_uuid,
			article_name: publicSchema.article.name,
			buyer_uuid: publicSchema.article.buyer_uuid,
			buyer_name: publicSchema.buyer.name,
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
			convention_rate: decimalToNumber(receive.convention_rate),
			created_by: receive_entry.created_by,
			created_by_name: hrSchema.users.name,
			created_at: receive_entry.created_at,
			updated_at: receive_entry.updated_at,
			remarks: receive_entry.remarks,
		})
		.from(receive_entry)
		.leftJoin(receive, eq(receive_entry.receive_uuid, receive.uuid))
		.leftJoin(material, eq(receive_entry.material_uuid, material.uuid))
		.leftJoin(
			hrSchema.users,
			eq(receive_entry.created_by, hrSchema.users.uuid)
		)
		.leftJoin(vendor, eq(receive.vendor_uuid, vendor.uuid))
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
		.leftJoin(
			publicSchema.buyer,
			eq(publicSchema.article.buyer_uuid, publicSchema.buyer.uuid)
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
			receive_id: sql`concat('R', to_char(receive.created_at, 'YY'), '-', LPAD(receive.id::text, 4, '0'))`,
			vendor_uuid: receive.vendor_uuid,
			vendor_name: vendor.name,
			material_uuid: receive_entry.material_uuid,
			article_uuid: material.article_uuid,
			article_name: publicSchema.article.name,
			buyer_uuid: publicSchema.article.buyer_uuid,
			buyer_name: publicSchema.buyer.name,
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
			convention_rate: decimalToNumber(receive.convention_rate),
			created_by: receive_entry.created_by,
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
		.leftJoin(
			publicSchema.buyer,
			eq(publicSchema.article.buyer_uuid, publicSchema.buyer.uuid)
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
			receive_id: sql`concat('R', to_char(receive.created_at, 'YY'), '-', LPAD(receive.id::text, 4, '0'))`,
			vendor_uuid: receive.vendor_uuid,
			vendor_name: vendor.name,
			material_uuid: receive_entry.material_uuid,
			article_uuid: material.article_uuid,
			article_name: publicSchema.article.name,
			buyer_uuid: publicSchema.article.buyer_uuid,
			buyer_name: publicSchema.buyer.name,
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
			convention_rate: decimalToNumber(receive.convention_rate),
			created_by: receive_entry.created_by,
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
		.leftJoin(
			publicSchema.buyer,
			eq(publicSchema.article.buyer_uuid, publicSchema.buyer.uuid)
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
