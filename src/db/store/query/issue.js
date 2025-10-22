import { and, desc, eq, sql } from 'drizzle-orm';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';
import * as publicSchema from '../../public/schema.js';
import { decimalToNumber } from '../../variables.js';
import {
	issue,
	material,
	material_name,
	unit,
	color,
	size,
} from '../schema.js';

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
			message: `${data.length} issued inserted`,
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
		.where(eq(issue.uuid, req.params.uuid))
		.returning({ updatedUuid: issue.uuid });

	try {
		const data = await issuePromise;

		const materialPromise = db
			.select({
				name: material_name.name,
			})
			.from(material_name)
			.leftJoin(material, eq(material_name.uuid, material.name_uuid))
			.leftJoin(issue, eq(material.uuid, issue.material_uuid))
			.where(eq(issue.uuid, data[0].updatedUuid));

		const materialData = await materialPromise;

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
	if (!(await validateRequest(req, next))) return;

	const issuePromise = db
		.delete(issue)
		.where(eq(issue.uuid, req.params.uuid))
		.returning({
			deletedUuid: issue.uuid,
			material_uuid: issue.material_uuid,
		});

	try {
		const data = await issuePromise;
		const materialPromise = db
			.select({
				name: material_name.name,
			})
			.from(material_name)
			.leftJoin(material, eq(material_name.uuid, material.name_uuid))
			.where(eq(material.uuid, data[0].material_uuid));
		const materialData = await materialPromise;
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
	if (!(await validateRequest(req, next))) return;

	const issuePromise = db
		.select({
			uuid: issue.uuid,
			material_uuid: issue.material_uuid,
			material_id: sql`concat('M', to_char(material.created_at, 'YY'), '-', (material.id::text))`,
			name_uuid: material.name_uuid,
			material_name: material_name.name,
			unit_uuid: material.unit_uuid,
			unit_name: unit.name,
			color_name: color.name,
			size_name: size.name,
			article_name: publicSchema.article.name,
			buyer_name: publicSchema.buyer.name,
			category_name: publicSchema.category.name,
			quantity: decimalToNumber(issue.quantity),
			store_quantity: decimalToNumber(material.quantity),
			created_by: issue.created_by,
			created_by_name: hrSchema.users.name,
			created_at: issue.created_at,
			updated_at: issue.updated_at,
			remarks: issue.remarks,
			index: issue.index,
		})
		.from(issue)
		.leftJoin(hrSchema.users, eq(issue.created_by, hrSchema.users.uuid))
		.leftJoin(material, eq(issue.material_uuid, material.uuid))
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
		.leftJoin(unit, eq(material.unit_uuid, unit.uuid))
		.leftJoin(color, eq(material.color_uuid, color.uuid))
		.leftJoin(size, eq(material.size_uuid, size.uuid))
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
	if (!(await validateRequest(req, next))) return;

	const issuePromise = db
		.select({
			uuid: issue.uuid,
			material_uuid: issue.material_uuid,
			material_id: sql`concat('M', to_char(material.created_at, 'YY'), '-', (material.id::text))`,
			name_uuid: material.name_uuid,
			material_name: material_name.name,
			unit_uuid: material.unit_uuid,
			unit_name: unit.name,
			color_name: color.name,
			size_name: size.name,
			article_name: publicSchema.article.name,
			buyer_name: publicSchema.buyer.name,
			category_name: publicSchema.category.name,
			quantity: decimalToNumber(issue.quantity),
			store_quantity: decimalToNumber(material.quantity),
			created_by: issue.created_by,
			created_by_name: hrSchema.users.name,
			created_at: issue.created_at,
			updated_at: issue.updated_at,
			remarks: issue.remarks,
			index: issue.index,
		})
		.from(issue)
		.leftJoin(hrSchema.users, eq(issue.created_by, hrSchema.users.uuid))
		.leftJoin(material, eq(issue.material_uuid, material.uuid))
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
		.leftJoin(unit, eq(material.unit_uuid, unit.uuid))
		.leftJoin(color, eq(material.color_uuid, color.uuid))
		.leftJoin(size, eq(material.size_uuid, size.uuid))
		.where(eq(issue.uuid, req.params.uuid));

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

export async function selectByIssueHeader(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const issuePromise = db
		.select({
			uuid: issue.uuid,
			issue_header_uuid: issue.issue_header_uuid,
			material_uuid: issue.material_uuid,
			material_id: sql`concat('M', to_char(material.created_at, 'YY'), '-', (material.id::text))`,
			name_uuid: material.name_uuid,
			material_name: material_name.name,
			unit_uuid: material.unit_uuid,
			unit_name: unit.name,
			color_name: color.name,
			size_name: size.name,
			article_name: publicSchema.article.name,
			buyer_name: publicSchema.buyer.name,
			category_name: publicSchema.category.name,
			quantity: decimalToNumber(issue.quantity),
			store_quantity: decimalToNumber(material.quantity),
			created_by: issue.created_by,
			created_by_name: hrSchema.users.name,
			created_at: issue.created_at,
			updated_at: issue.updated_at,
			remarks: issue.remarks,
			index: issue.index,
		})
		.from(issue)
		.leftJoin(hrSchema.users, eq(issue.created_by, hrSchema.users.uuid))
		.leftJoin(material, eq(issue.material_uuid, material.uuid))
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
		.leftJoin(unit, eq(material.unit_uuid, unit.uuid))
		.leftJoin(color, eq(material.color_uuid, color.uuid))
		.leftJoin(size, eq(material.size_uuid, size.uuid))
		.where(eq(issue.issue_header_uuid, req.params.issue_header_uuid));

	try {
		const data = await issuePromise;
		const toast = {
			status: 200,
			type: 'select one',
			message: 'issue details',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
