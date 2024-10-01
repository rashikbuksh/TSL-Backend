import { Router } from 'express';

import * as otherOperations from './query/query.js';

const otherRouter = Router();

//public buyer
otherRouter.get('/buyer/value/label', otherOperations.selectBuyer);

//public category
otherRouter.get('/category/value/label', otherOperations.selectCategory);

//public article
otherRouter.get('/article/value/label', otherOperations.selectArticle);

//public buyer swagger route
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

//public category swagger route

const pathCategory = {
	'/other/category/value/label': {
		get: {
			operationId: 'selectCategory',
			tags: ['other'],
			summary: 'Select Category',
			description: 'Select Category',
			responses: {
				200: {
					description: 'Returns a all categories.',
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
										example: 'category 1',
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

//public article swagger route

const pathArticle = {
	'/other/article/value/label': {
		get: {
			operationId: 'selectArticle',
			tags: ['other'],
			summary: 'Select Article',
			description: 'Select Article',
			responses: {
				200: {
					description: 'Returns a all articles.',
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
										example: 'article 1',
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
	...pathCategory,
	...pathArticle,
};

export const tagOther = [
	{
		name: 'other',
		description: 'Other operations',
	},
];

export { otherRouter };
