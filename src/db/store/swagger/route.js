import SE from '../../../util/swagger_example.js';

const pathIssueHeader = {
	'/store/issue-header': {
		get: {
			tags: ['store.issue_header'],
			summary: 'Select all Issue Headers',
			responses: {
				200: SE.response_schema_ref(200, 'store/issue_header'),
			},
		},
		post: {
			tags: ['store.issue_header'],
			summary: 'Insert Issue Header',
			requestBody: SE.requestBody_schema_ref('store/issue_header'),
			responses: {
				201: SE.response_schema_ref(200, 'store/issue_header'),
			},
		},
	},
	'/store/issue-header/{uuid}': {
		get: {
			tags: ['store.issue_header'],
			summary: 'Select Issue Header',
			parameters: [SE.parameter_params('uuid', 'string', true)],
			responses: {
				200: SE.response_schema_ref(200, 'store/issue_header'),
			},
		},
		put: {
			tags: ['store.issue_header'],
			summary: 'Update Issue Header',
			parameters: [SE.parameter_params('uuid', 'string', true)],
			requestBody: SE.requestBody_schema_ref('store/issue_header'),
			responses: {
				200: SE.response_schema_ref(200, 'store/issue_header'),
			},
		},
		delete: {
			tags: ['store.issue_header'],
			summary: 'Delete Issue Header',
			parameters: [SE.parameter_params('uuid', 'string', true)],
			responses: {
				200: SE.response(200),
			},
		},
	},
	'/store/issue-details/by/{issue_header_uuid}': {
		get: {
			tags: ['store.issue_header'],
			summary: 'Select Issue Header Details',
			parameters: [
				SE.parameter_params(
					'issue_header_uuid',
					'issue_header_uuid',
					'string'
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'store/issue_header'),
			},
		},
	},
};

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
	'/store/issue/by/{issue_header_uuid}': {
		get: {
			tags: ['store.issue'],
			summary: 'Select Issue by Issue Header UUID',
			parameters: [
				SE.parameter_params(
					'issue_header_uuid',
					'issue_header_uuid',
					'string'
				),
			],
			responses: {
				200: SE.response_schema_ref(200, 'store/issue'),
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
	'/store/receive-entry/by/{receive_uuid}': {
		get: {
			tags: ['store.receive_entry'],
			summary: 'Select ReceiveEntry by Receive UUID',
			parameters: [
				{
					name: 'receive_uuid',
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
	},
	'/store/receive-entry/for/receive-log/{uuid}': {
		put: {
			tags: ['store.receive_entry'],
			summary: 'Update Receive Entry for Receive Log',
			parameters: [SE.parameter_params('uuid', 'uuid', 'string')],
			requestBody: SE.requestBody_schema_ref('store/receive_entry'),
			responses: {
				200: SE.response_schema_ref(200, 'store/receive_entry'),
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
	'/store/receive-entry-details/by/{receive_uuid}': {
		get: {
			tags: ['store.receive'],
			summary: 'Select Receive Entry Details',
			parameters: [
				{
					name: 'receive_uuid',
					in: 'path',
					required: true,
					schema: { type: 'string' },
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
	},
	'/store/receive-with-entry': {
		get: {
			tags: ['store.receive'],
			summary: 'Select all Receive with Entry',
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

const pathMaterialName = {
	'/store/material-name': {
		get: {
			tags: ['store.material_name'],
			summary: 'Select all MaterialName',
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/definitions/store/material_name',
								},
							},
						},
					},
				},
			},
		},

		post: {
			tags: ['store.material_name'],
			summary: 'Insert MaterialName',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/store/material_name',
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
								$ref: '#/definitions/store/material_name',
							},
						},
					},
				},
			},
		},
	},

	'/store/material-name/{uuid}': {
		get: {
			tags: ['store.material_name'],
			summary: 'Select MaterialName',
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
								$ref: '#/definitions/store/material_name',
							},
						},
					},
				},
			},
		},

		put: {
			tags: ['store.material_name'],
			summary: 'Update MaterialName',
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
							$ref: '#/definitions/store/material_name',
						},
					},
				},
			},
			responses: { 200: { description: 'Successful operation' } },
		},

		delete: {
			tags: ['store.material_name'],
			summary: 'Delete MaterialName',
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

const pathUnit = {
	'/store/unit': {
		get: {
			tags: ['store.unit'],
			summary: 'Select all Unit',
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/definitions/store/unit',
								},
							},
						},
					},
				},
			},
		},

		post: {
			tags: ['store.unit'],
			summary: 'Insert Unit',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/store/unit',
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
								$ref: '#/definitions/store/unit',
							},
						},
					},
				},
			},
		},
	},

	'/store/unit/{uuid}': {
		get: {
			tags: ['store.unit'],
			summary: 'Select Unit',
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
								$ref: '#/definitions/store/unit',
							},
						},
					},
				},
			},
		},

		put: {
			tags: ['store.unit'],
			summary: 'Update Unit',
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
							$ref: '#/definitions/store/unit',
						},
					},
				},
			},
			responses: { 200: { description: 'Successful operation' } },
		},

		delete: {
			tags: ['store.unit'],
			summary: 'Delete Unit',
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

const pathSize = {
	'/store/size': {
		get: {
			tags: ['store.size'],
			summary: 'Select all Size',
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/definitions/store/size',
								},
							},
						},
					},
				},
			},
		},

		post: {
			tags: ['store.size'],
			summary: 'Insert Size',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/store/size',
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
								$ref: '#/definitions/store/size',
							},
						},
					},
				},
			},
		},
	},

	'/store/size/{uuid}': {
		get: {
			tags: ['store.size'],
			summary: 'Select Size',
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
								$ref: '#/definitions/store/size',
							},
						},
					},
				},
			},
		},

		put: {
			tags: ['store.size'],
			summary: 'Update Size',
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
							$ref: '#/definitions/store/size',
						},
					},
				},
			},
			responses: { 200: { description: 'Successful operation' } },
		},

		delete: {
			tags: ['store.size'],
			summary: 'Delete Size',
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

const pathColor = {
	'/store/color': {
		get: {
			tags: ['store.color'],
			summary: 'Select all Color',
			responses: {
				200: {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/definitions/store/color',
								},
							},
						},
					},
				},
			},
		},

		post: {
			tags: ['store.color'],
			summary: 'Insert Color',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/definitions/store/color',
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
								$ref: '#/definitions/store/color',
							},
						},
					},
				},
			},
		},
	},

	'/store/color/{uuid}': {
		get: {
			tags: ['store.color'],
			summary: 'Select Color',
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
								$ref: '#/definitions/store/color',
							},
						},
					},
				},
			},
		},

		put: {
			tags: ['store.color'],
			summary: 'Update Color',
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
							$ref: '#/definitions/store/color',
						},
					},
				},
			},
			responses: { 200: { description: 'Successful operation' } },
		},

		delete: {
			tags: ['store.color'],
			summary: 'Delete Color',
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
	...pathIssueHeader,
	...pathIssue,
	...pathMaterial,
	...pathReceiveEntry,
	...pathReceive,
	...pathVendor,
	...pathMaterialName,
	...pathUnit,
	...pathSize,
	...pathColor,
};
