import { and, eq, min, sql, sum } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';

import db from '../../index.js';

import * as publicSchema from '../../public/schema.js';
import * as hrSchema from '../../hr/schema.js';
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
			label: publicSchema.article.name,
		})
		.from(publicSchema.article)
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

// store material, vendor, receive

export async function selectMaterial(req, res, next) {
	const materialPromise = db
		.select({
			value: storeSchema.material.uuid,
			label: storeSchema.material.name,
		})
		.from(storeSchema.material)
		.orderBy(storeSchema.material.name);

	const toast = {
		status: 200,
		type: 'select',
		message: `Material selected`,
	};
	handleResponse({ promise: materialPromise, res, next, ...toast });
}

export async function selectVendor(req, res, next) {
	const vendorPromise = db
		.select({
			value: storeSchema.vendor.uuid,
			label: storeSchema.vendor.name,
		})
		.from(storeSchema.vendor)
		.orderBy(storeSchema.vendor.name);

	const toast = {
		status: 200,
		type: 'select',
		message: `Vendor selected`,
	};
	handleResponse({ promise: vendorPromise, res, next, ...toast });
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
