import { Router } from 'express';

import SE, { SED } from '../../util/swagger_example.js';

import * as reportOperations from './query/query.js';

const reportRouter = Router();

// store material report

reportRouter.get(
	'/store-material-report/:start_date/:end_date',
	reportOperations.storeMaterialReport
);

export const pathReport = {
	'/report/store-material-report/{start_date}/{end_date}': {
		get: {
			tags: ['report'],
			summary: 'Store Material Report',
			description: 'Store Material Report',
			parameters: [
				{
					in: 'path',
					name: 'start_date',
					description: 'Start Date',
					required: true,
					schema: {
						type: 'string',
						example: '2024-10-02',
					},
				},
				{
					in: 'path',
					name: 'end_date',
					description: 'End Date',
					required: true,
					schema: {
						type: 'string',
						example: '2024-10-03',
					},
				},
			],
			responses: {
				200: SED.storeMaterialReport,
				400: SED.badRequest,
				500: SED.internalServerError,
			},
		},
	},
};

export const tagReport = [
	{
		name: 'report',
		description: 'Report Operations',
	},
];

export { reportRouter };
