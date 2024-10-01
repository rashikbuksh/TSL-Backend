import SE from '../../../util/swagger_example.js';

const pathArticle = {
	'/public/article': {
		get: {
			tags: ['public.article'],
			summary: 'Select all Article',
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/definitions/public/article',
								},
							},
						},
					},
				},
			},
		},

		post: {
			tags: ['public.article'],
			summary: 'Insert Article',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/public/article',
						},
					},
				},
			},
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								$ref: '#/definitions/public/article',
							},
						},
					},
				},
			},
		},
	},

	'/public/article/{uuid}': {
		get: {
			tags: ['public.article'],
			summary: 'Select Article',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								$ref: '#/definitions/public/article',
							},
						},
					},
				},
			},
		},

		put: {
			tags: ['public.article'],
			summary: 'Update Article',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/public/article',
						},
					},
				},
			},
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								$ref: '#/definitions/public/article',
							},
						},
					},
				},
			},
		},

		delete: {
			tags: ['public.article'],
			summary: 'Delete Article',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								$ref: '#/definitions/public/article',
							},
						},
					},
				},
			},
		},
	},
};

const pathBuyer = {
	'/public/buyer': {
		get: {
			tags: ['public.buyer'],
			summary: 'Select all Buyer',
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/definitions/public/buyer',
								},
							},
						},
					},
				},
			},
		},

		post: {
			tags: ['public.buyer'],
			summary: 'Insert Buyer',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/public/buyer',
						},
					},
				},
			},
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								$ref: '#/definitions/public/buyer',
							},
						},
					},
				},
			},
		},
	},

	'/public/buyer/{uuid}': {
		get: {
			tags: ['public.buyer'],
			summary: 'Select Buyer',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								$ref: '#/definitions/public/buyer',
							},
						},
					},
				},
			},
		},

		put: {
			tags: ['public.buyer'],
			summary: 'Update Buyer',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/public/buyer',
						},
					},
				},
			},
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								$ref: '#/definitions/public/buyer',
							},
						},
					},
				},
			},
		},

		delete: {
			tags: ['public.buyer'],
			summary: 'Delete Buyer',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								$ref: '#/definitions/public/buyer',
							},
						},
					},
				},
			},
		},
	},
};

const pathCategory = {
	'/public/category': {
		get: {
			tags: ['public.category'],
			summary: 'Select all Category',
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/definitions/public/category',
								},
							},
						},
					},
				},
			},
		},

		post: {
			tags: ['public.category'],
			summary: 'Insert Category',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/public/category',
						},
					},
				},
			},
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								$ref: '#/definitions/public/category',
							},
						},
					},
				},
			},
		},
	},

	'/public/category/{uuid}': {
		get: {
			tags: ['public.category'],
			summary: 'Select Category',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								$ref: '#/definitions/public/category',
							},
						},
					},
				},
			},
		},

		put: {
			tags: ['public.category'],
			summary: 'Update Category',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/public/category',
						},
					},
				},
			},
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								$ref: '#/definitions/public/category',
							},
						},
					},
				},
			},
		},

		delete: {
			tags: ['public.category'],
			summary: 'Delete Category',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								$ref: '#/definitions/public/category',
							},
						},
					},
				},
			},
		},
	},
};

export const pathPublic = {
	...pathArticle,
	...pathBuyer,
	...pathCategory,
};
