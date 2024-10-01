import { Router } from 'express';

import * as otherOperations from './query/query.js';

const otherRouter = Router();

//public buyer

otherRouter.get('/buyer/value/label', otherOperations.selectBuyer);

const pathBuyer = {
	'/other/buyer/value/label': {
		get: {
			operationId: 'selectBuyer',
			tags: ['other'],
			summary: 'Select Buyer',
			description: 'Select Buyer',
			responses: {
				200: {
					description: 'Returns a all buyers.',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: {
										type: 'string',
										example: '2ggcphnwHGzEUGy',
									},
									label: {
										type: 'string',
										example: 'buyer 1',
									},
								},
							},
						},
					},
				},
			},
		},
	},
};

export const pathOther = {
	...pathBuyer,
};

export const tagOther = [
	{
		name: 'other',
		description: 'Other operations',
	},
];

export { otherRouter };
