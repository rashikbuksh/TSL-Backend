import { desc, eq, sql } from 'drizzle-orm';
import { createApi } from '../../../util/api.js';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';

import { decimalToNumber } from '../../variables.js';
import { issue_header } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const issueHeaderPromise = db
		.insert(issue_header)
		.values(req.body)
		.returning({
			insertedName: sql`concat('I', to_char(issue_header.created_at, 'YY'), '-', (issue_header.id::text))`,
		});

	try {
		const data = await issueHeaderPromise;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedName} inserted`,
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

	const issueHeaderPromise = db
		.update(issue_header)
		.set(req.body)
		.where(eq(issue_header.uuid, req.params.uuid))
		.returning({
			updatedName: sql`concat('I', to_char(issue_header.created_at, 'YY'), '-', (issue_header.id::text))`,
		});

	try {
		const data = await issueHeaderPromise;
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

	const issueHeaderPromise = db
		.delete(issue_header)
		.where(eq(issue_header.uuid, req.params.uuid))
		.returning({
			deletedName: sql`concat('I', to_char(issue_header.created_at, 'YY'), '-', LPAD(issue_header.id::text, 4, '0'))`,
		});

	try {
		const data = await issueHeaderPromise;
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
	const issueHeaderPromise = db
		.select({
			uuid: issue_header.uuid,
			serial_no: issue_header.serial_no,
			id: issue_header.id,
			issue_id: sql`concat('I', to_char(issue_header.created_at, 'YY'), '-', LPAD(issue_header.id::text, 4, '0'))`,
			created_by: issue_header.created_by,
			created_by_name: hrSchema.users.name,
			created_at: issue_header.created_at,
			updated_at: issue_header.updated_at,
			remarks: issue_header.remarks,
			issue_count: decimalToNumber(sql`(
				select count(*)
				from store.issue
				where store.issue.issue_header_uuid = issue_header.uuid
			)`),
			issue_date: issue_header.issue_date,
		})
		.from(issue_header)
		.leftJoin(
			hrSchema.users,
			eq(issue_header.created_by, hrSchema.users.uuid)
		)
		.orderBy(desc(issue_header.created_at));

	try {
		const data = await issueHeaderPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Issue Header list',
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

	const issueHeaderPromise = db
		.select({
			uuid: issue_header.uuid,
			serial_no: issue_header.serial_no,
			id: issue_header.id,
			issue_id: sql`concat('I', to_char(issue_header.created_at, 'YY'), '-', LPAD(issue_header.id::text, 4, '0'))`,
			created_by: issue_header.created_by,
			created_by_name: hrSchema.users.name,
			created_at: issue_header.created_at,
			updated_at: issue_header.updated_at,
			remarks: issue_header.remarks,
			issue_count: decimalToNumber(sql`(
				select count(*)
				from store.issue
				where store.issue.header_uuid = issue_header.uuid
			)`),
			issue_date: issue_header.issue_date,
		})
		.from(issue_header)
		.leftJoin(
			hrSchema.users,
			eq(issue_header.created_by, hrSchema.users.uuid)
		)
		.where(eq(issue_header.uuid, req.params.uuid));

	try {
		const data = await issueHeaderPromise;
		const toast = {
			status: 200,
			type: 'select one',
			message: 'issue header details',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function selectIssueDetails(req, res, next) {
	if (!validateRequest(req, next)) return;

	const { issue_header_uuid } = req.params;
	try {
		const api = await createApi(req);
		const fetchData = async (endpoint) =>
			await api
				.get(`/store/${endpoint}/${issue_header_uuid}`)
				.then((response) => response);

		const [issue_header, issue] = await Promise.all([
			fetchData('issue-header'),
			fetchData('issue/by'),
		]);

		const response = {
			...issue_header?.data?.data,
			issue: issue?.data?.data || [],
		};

		const toast = {
			status: 200,
			type: 'select',
			msg: 'Issue Details Full',
		};

		res.status(200).json({ toast, data: response });
	} catch (error) {
		await handleError({ error, res });
	}
}
