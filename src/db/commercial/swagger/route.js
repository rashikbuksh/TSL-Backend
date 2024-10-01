import SE from '../../../util/swagger_example.js';

// * ./schema.js#lc

const pathLc = {
	'/commercial/lc': {
		get: {
			tags: ['commercial.lc'],
			summary: 'Select all Lc',
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/definitions/commercial/Lc',
								},
							},
						},
					},
				},
			},
		},

		post: {
			tags: ['commercial.lc'],
			summary: 'Insert Lc',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/commercial/Lc',
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
								$ref: '#/definitions/commercial/Lc',
							},
						},
					},
				},
			},
		},
	},

	'/commercial/lc/{uuid}': {
		get: {
			tags: ['commercial.lc'],
			summary: 'Select Lc',
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
								$ref: '#/definitions/commercial/Lc',
							},
						},
					},
				},
			},
		},

		put: {
			tags: ['commercial.lc'],
			summary: 'Update Lc',
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
							$ref: '#/definitions/commercial/Lc',
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
								$ref: '#/definitions/commercial/Lc',
							},
						},
					},
				},
			},
		},

		delete: {
			tags: ['commercial.lc'],
			summary: 'Delete Lc',
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
				},
			},
		},
	},
};

export const pathCommercial = {
	...pathLc,
};
