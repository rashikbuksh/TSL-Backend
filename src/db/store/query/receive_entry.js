import { desc, eq, sql } from 'drizzle-orm';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';

import * as publicSchema from '../../public/schema.js';

import { material, receive, receive_entry } from '../schema.js';

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
	if (!(await validateRequest(req, next))) return;
	const query = sql`
						SELECT
								re.uuid,
								re.receive_uuid,
								concat('R', to_char(r.created_at, 'YY'), '-', LPAD(r.id::text, 4, '0')) AS receive_id,
								re.material_uuid,
								m.name AS material_name,
								m.unit AS material_unit,
								a.name AS article_name,
								b.name AS buyer_name,
								c.name AS category_name,
								re.quantity,
								re.price,
								re.created_by,
								u.name AS created_by_name,
								re.created_at,
								re.updated_at,
								re.remarks
							FROM 
								store.receive_entry re
							LEFT JOIN 
								store.receive  r ON r.uuid = re.receive_uuid
							LEFT JOIN 
								store.material m ON m.uuid = re.material_uuid
							LEFT JOIN 
								public.article a ON a.uuid = m.article_uuid
							LEFT JOIN 
								public.buyer b ON b.uuid = a.buyer_uuid
							LEFT JOIN 
								public.category c ON c.uuid = m.category_uuid
							LEFT JOIN 
								hr.users u ON u.uuid = re.created_by
							ORDER BY
								re.created_at DESC`;

	const resultPromise = db.execute(query);

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'receive_entry list',
		};
		return await res.status(200).json({ toast, data: data?.rows });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;
	const query = sql`
						SELECT
								re.uuid,
								re.receive_uuid,
								concat('R', to_char(r.created_at, 'YY'), '-', LPAD(r.id::text, 4, '0')) AS receive_id,
								re.material_uuid,
								m.name AS material_name,
								m.unit AS material_unit,
								a.name AS article_name,
								b.name AS buyer_name,
								c.name AS category_name,
								re.quantity,
								re.price,
								re.created_by,
								u.name AS created_by_name,
								re.created_at,
								re.updated_at,
								re.remarks
							FROM 
								store.receive_entry re
							LEFT JOIN 
								store.receive  r ON r.uuid = re.receive_uuid
							LEFT JOIN 
								store.material m ON m.uuid = re.material_uuid
							LEFT JOIN 
								public.article a ON a.uuid = m.article_uuid
							LEFT JOIN 
								public.buyer b ON b.uuid = a.buyer_uuid
							LEFT JOIN 
								public.category c ON c.uuid = m.category_uuid
							LEFT JOIN 
								hr.users u ON u.uuid = re.created_by
							WHERE
								re.uuid = ${req.params.uuid}`;

	const resultPromise = db.execute(query);

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select one',
			message: 'receive_entry details',
		};
		return await res.status(200).json({ toast, data: data?.rows[0] });
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
			material_uuid: receive_entry.material_uuid,
			material_name: material.name,
			material_unit: material.unit,
			article_name: publicSchema.article.name,
			buyer_name: publicSchema.buyer.name,
			category_name: publicSchema.category.name,
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
		.leftJoin(material, eq(receive_entry.material_uuid, material.uuid))
		.leftJoin(
			publicSchema.article,
			eq(material.article_uuid, publicSchema.article.uuid)
		)
		.leftJoin(
			publicSchema.buyer,
			eq(publicSchema.article.buyer_uuid, publicSchema.buyer.uuid)
		)
		.leftJoin(
			publicSchema.category,
			eq(material.category_uuid, publicSchema.category.uuid)
		)
		.where(eq(receive_entry.receive_uuid, req.params.receive_uuid))
		.orderBy(desc(receive_entry.created_at));
	const toast = {
		status: 200,
		type: 'select all',
		message: 'receive_entry list',
	};

	handleResponse({ promise: receive_entryPromise, res, next, ...toast });
}
