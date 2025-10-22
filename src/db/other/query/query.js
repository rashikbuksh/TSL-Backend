import { eq, sql } from 'drizzle-orm';
import { handleError, handleResponse } from '../../../util/index.js';

import db from '../../index.js';

import * as commercialSchema from '../../commercial/schema.js';
import * as hrSchema from '../../hr/schema.js';
import * as publicSchema from '../../public/schema.js';
import * as storeSchema from '../../store/schema.js';

// public buyer , category, article
export async function selectBuyer(req, res, next) {
	const buyerPromise = db
		.select({
			value: publicSchema.buyer.uuid,
			label: publicSchema.buyer.name,
		})
		.from(publicSchema.buyer)
		.orderBy(publicSchema.buyer.name);

	const toast = {
		status: 200,
		type: 'select',
		message: `Buyer selected`,
	};
	handleResponse({ promise: buyerPromise, res, next, ...toast });
}

export async function selectCategory(req, res, next) {
	const categoryPromise = db
		.select({
			value: publicSchema.category.uuid,
			label: publicSchema.category.name,
		})
		.from(publicSchema.category)
		.orderBy(publicSchema.category.name);

	const toast = {
		status: 200,
		type: 'select',
		message: `Category selected`,
	};
	handleResponse({ promise: categoryPromise, res, next, ...toast });
}

export async function selectArticle(req, res, next) {
	const articlePromise = db
		.select({
			value: publicSchema.article.uuid,
			label: sql`concat(${publicSchema.article.name}, '-', ${publicSchema.buyer.name})`,
		})
		.from(publicSchema.article)
		.leftJoin(
			publicSchema.buyer,
			eq(publicSchema.article.buyer_uuid, publicSchema.buyer.uuid)
		)
		.orderBy(publicSchema.article.name);

	const toast = {
		status: 200,
		type: 'select',
		message: `Article selected`,
	};
	handleResponse({ promise: articlePromise, res, next, ...toast });
}

// hr department, designation, user
export async function selectDepartment(req, res, next) {
	const departmentPromise = db
		.select({
			value: hrSchema.department.uuid,
			label: hrSchema.department.department,
		})
		.from(hrSchema.department);

	const toast = {
		status: 200,
		type: 'select_all',
		message: 'Department list',
	};
	handleResponse({
		promise: departmentPromise,
		res,
		next,
		...toast,
	});
}

export async function selectDesignation(req, res, next) {
	const designationPromise = db
		.select({
			value: hrSchema.designation.uuid,
			label: hrSchema.designation.designation,
		})
		.from(hrSchema.designation);

	const toast = {
		status: 200,
		type: 'select_all',
		message: 'Designation list',
	};
	handleResponse({
		promise: designationPromise,
		res,
		next,
		...toast,
	});
}

export async function selectHrUser(req, res, next) {
	const userPromise = db
		.select({
			value: hrSchema.users.uuid,
			label: hrSchema.users.name,
		})
		.from(hrSchema.users);

	const toast = {
		status: 200,
		type: 'select_all',
		message: 'User list',
	};
	handleResponse({
		promise: userPromise,
		res,
		next,
		...toast,
	});
}

// store material, material_name, unit, color, size, vendor, receive

export async function selectMaterial(req, res, next) {
	const query = sql`
		select
			m.uuid as value,
			concat('M', to_char(m.created_at, 'YY'), '-', (m.id::text), ' - ', mn.name) as label,
			m.quantity::float8 as max_quantity,
			mn.name as material_name,
			a.name as article_name,
			b.name as buyer_name,
			c.name as category_name,
			u.name as unit_name,
			col.name as color_name,
			s.name as size_name
		from
			store.material m
		LEFT JOIN 
			store.material_name mn ON m.name_uuid = mn.uuid
		LEFT JOIN
			public.article a ON m.article_uuid = a.uuid
		LEFT JOIN
			public.buyer b ON a.buyer_uuid = b.uuid
		LEFT JOIN
			public.category c ON m.category_uuid = c.uuid
		LEFT JOIN 
			store.unit u ON m.unit_uuid = u.uuid
		LEFT JOIN
			store.color col ON m.color_uuid = col.uuid
		LEFT JOIN
			store.size s ON m.size_uuid = s.uuid
		order by
			m.created_at desc
	`;

	const materialPromise = db.execute(query);
	try {
		const data = await materialPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: `Material selected`,
		};
		return res.status(200).json({ toast, data: data?.rows });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function selectMaterialName(req, res, next) {
	const materialNamePromise = db
		.select({
			value: storeSchema.material_name.uuid,
			label: storeSchema.material_name.name,
		})
		.from(storeSchema.material_name)
		.orderBy(storeSchema.material_name.name);

	try {
		const data = await materialNamePromise;
		const toast = {
			status: 200,
			type: 'select',
			message: `Material Name selected`,
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function selectColor(req, res, next) {
	const colorPromise = db
		.select({
			value: storeSchema.color.uuid,
			label: storeSchema.color.name,
		})
		.from(storeSchema.color)
		.orderBy(storeSchema.color.name);

	try {
		const data = await colorPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: `Color selected`,
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function selectSize(req, res, next) {
	const sizePromise = db
		.select({
			value: storeSchema.size.uuid,
			label: storeSchema.size.name,
		})
		.from(storeSchema.size)
		.orderBy(storeSchema.size.name);

	try {
		const data = await sizePromise;
		const toast = {
			status: 200,
			type: 'select',
			message: `Size selected`,
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function selectUnit(req, res, next) {
	const unitPromise = db
		.select({
			value: storeSchema.unit.uuid,
			label: storeSchema.unit.name,
		})
		.from(storeSchema.unit)
		.orderBy(storeSchema.unit.name);

	try {
		const data = await unitPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: `Unit selected`,
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function selectVendor(req, res, next) {
	const vendorPromise = db
		.select({
			value: storeSchema.vendor.uuid,
			label: storeSchema.vendor.name,
		})
		.from(storeSchema.vendor)
		.orderBy(storeSchema.vendor.name);

	try {
		const data = await vendorPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: `Vendor selected`,
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

// export async function selectReceive(req, res, next) {
// 	const receivePromise = db
// 		.select({
// 			value: storeSchema.receive.uuid,
// 			label: storeSchema.receive.name,
// 		})
// 		.from(storeSchema.receive)
// 		.orderBy(storeSchema.receive.name);

// 	const toast = {
// 		status: 200,
// 		type: 'select',
// 		message: `Receive selected`,
// 	};
// 	handleResponse({ promise: receivePromise, res, next, ...toast });
// }

export async function selectLc(req, res, next) {
	const lcPromise = db
		.select({
			value: commercialSchema.lc.uuid,
			label: commercialSchema.lc.number,
		})
		.from(commercialSchema.lc)
		.orderBy(commercialSchema.lc.number);

	const toast = {
		status: 200,
		type: 'select',
		message: `LC selected`,
	};
	handleResponse({ promise: lcPromise, res, next, ...toast });
}

export async function selectMasterLc(req, res, next) {
	const masterLcPromise = db
		.select({
			value: commercialSchema.master_lc.uuid,
			label: commercialSchema.master_lc.number,
		})
		.from(commercialSchema.master_lc)
		.orderBy(commercialSchema.master_lc.number);

	const toast = {
		status: 200,
		type: 'select',
		message: `Master LC selected`,
	};
	handleResponse({ promise: masterLcPromise, res, next, ...toast });
}
