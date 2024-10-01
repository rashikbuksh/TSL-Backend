import SE from '../../../util/swagger_example.js';
const pathIssue = {
	'/store/issue': {
		get: {
			tags: ['store.issue'],
			summary: 'Select all Issue',
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/definitions/store/issue',
								},
							},
						},
					},
				},
			},
		},

		post: {
			tags: ['store.issue'],
			summary: 'Insert Issue',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/store/issue',
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
								$ref: '#/definitions/store/issue',
							},
						},
					},
				},
			},
		},
	},

	'/store/issue/{uuid}': {
		get: {
			tags: ['store.issue'],
			summary: 'Select Issue',
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
								$ref: '#/definitions/store/issue',
							},
						},
					},
				},
			},
		},

		put: {
			tags: ['store.issue'],
			summary: 'Update Issue',
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
							$ref: '#/definitions/store/issue',
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
								$ref: '#/definitions/store/issue',
							},
						},
					},
				},
			},
		},

		delete: {
			tags: ['store.issue'],
			summary: 'Delete Issue',
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

const pathMaterial = {
	'/store/material': {
		get: {
			tags: ['store.material'],
			summary: 'Select all Material',
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/definitions/store/material',
								},
							},
						},
					},
				},
			},
		},

		post: {
			tags: ['store.material'],
			summary: 'Insert Material',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/store/material',
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
								$ref: '#/definitions/store/material',
							},
						},
					},
				},
			},
		},
	},

	'/store/material/{uuid}': {
		get: {
			tags: ['store.material'],
			summary: 'Select Material',
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
								$ref: '#/definitions/store/material',
							},
						},
					},
				},
			},
		},

		put: {
			tags: ['store.material'],
			summary: 'Update Material',
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
							$ref: '#/definitions/store/material',
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
								$ref: '#/definitions/store/material',
							},
						},
					},
				},
			},
		},

		delete: {
			tags: ['store.material'],
			summary: 'Delete Material',
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

const pathReceiveEntry = {
	'/store/receive-entry': {
		get: {
			tags: ['store.receive_entry'],
			summary: 'Select all ReceiveEntry',
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/definitions/store/receive_entry',
								},
							},
						},
					},
				},
			},
		},

		post: {
			tags: ['store.receive_entry'],
			summary: 'Insert ReceiveEntry',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/store/receive_entry',
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
								$ref: '#/definitions/store/receive_entry',
							},
						},
					},
				},
			},
		},
	},

	'/store/receive-entry/{uuid}': {
		get: {
			tags: ['store.receive_entry'],
			summary: 'Select ReceiveEntry',
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
								$ref: '#/definitions/store/receive_entry',
							},
						},
					},
				},
			},
		},

		put: {
			tags: ['store.receive_entry'],
			summary: 'Update ReceiveEntry',
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
							$ref: '#/definitions/store/receive_entry',
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
								$ref: '#/definitions/store/receive_entry',
							},
						},
					},
				},
			},
		},

		delete: {
			tags: ['store.receive_entry'],
			summary: 'Delete ReceiveEntry',
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

const pathReceive = {
	'/store/receive': {
		get: {
			tags: ['store.receive'],
			summary: 'Select all Receive',
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/definitions/store/receive',
								},
							},
						},
					},
				},
			},
		},

		post: {
			tags: ['store.receive'],
			summary: 'Insert Receive',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/store/receive',
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
								$ref: '#/definitions/store/receive',
							},
						},
					},
				},
			},
		},
	},

	'/store/receive/{uuid}': {
		get: {
			tags: ['store.receive'],
			summary: 'Select Receive',
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
								$ref: '#/definitions/store/receive',
							},
						},
					},
				},
			},
		},

		put: {
			tags: ['store.receive'],
			summary: 'Update Receive',
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
							$ref: '#/definitions/store/receive',
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
								$ref: '#/definitions/store/receive',
							},
						},
					},
				},
			},
		},

		delete: {
			tags: ['store.receive'],
			summary: 'Delete Receive',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					required: true,
					schema: { type: 'string' },
				},
			],
			responses: { 200: { description: 'Successful operation' } },
		},
	},
};

const pathVendor = {
	'/store/vendor': {
		get: {
			tags: ['store.vendor'],
			summary: 'Select all Vendor',
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/definitions/store/vendor',
								},
							},
						},
					},
				},
			},
		},

		post: {
			tags: ['store.vendor'],
			summary: 'Insert Vendor',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/store/vendor',
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
								$ref: '#/definitions/store/vendor',
							},
						},
					},
				},
			},
		},
	},

	'/store/vendor/{uuid}': {
		get: {
			tags: ['store.vendor'],
			summary: 'Select Vendor',
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
								$ref: '#/definitions/store/vendor',
							},
						},
					},
				},
			},
		},

		put: {
			tags: ['store.vendor'],
			summary: 'Update Vendor',
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
							$ref: '#/definitions/store/vendor',
						},
					},
				},
			},
			responses: { 200: { description: 'Successful operation' } },
		},

		delete: {
			tags: ['store.vendor'],
			summary: 'Delete Vendor',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					required: true,
					schema: { type: 'string' },
				},
			],
			responses: { 200: { description: 'Successful operation' } },
		},
	},
};

export const pathStore = {
	...pathIssue,
	...pathMaterial,
	...pathReceiveEntry,
	...pathReceive,
	...pathVendor,
};
