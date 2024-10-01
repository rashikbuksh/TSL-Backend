import { and, eq, min, sql, sum } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';

import db from '../../index.js';

import * as publicSchema from '../../public/schema.js';

// public buyer

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

//public category

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

//public article

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
