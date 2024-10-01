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



