import { SED } from '../../util/swagger_example.js';

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
	'/report/store-vendor-wise-material-report/{start_date}/{end_date}': {
		get: {
			tags: ['report'],
			summary: 'Store Vendor Wise Material Report',
			description: 'Store Vendor Wise Material Report',
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
				200: SED.storeVendorWiseMaterialReport,
				400: SED.badRequest,
				500: SED.internalServerError,
			},
		},
	},
	'/report/acc-balance-report': {
		get: {
			summary: 'Account Balance Report',
			description: 'Account Balance Report',
			tags: ['report'],
			operationId: 'selectAccBalanceReport',
			parameters: [
				SE.parameter_query('from', 'from', '2024-10-01'),
				SE.parameter_query('to', 'to', ['2024-10-31']),
				SE.parameter_query('type', 'type', [
					'balance_sheet',
					'profit_and_loss',
				]),
				SE.parameter_query('own_uuid', 'own_uuid', SE.uuid()),
			],
			responses: {
				200: SE.response_schema(200, {
					account_name: SE.string('Account Name'),
					balance: SE.number(610),
					account_type: SE.string('Account Type'),
				}),
			},
		},
	},
	'/report/chart-of-accounts': {
		get: {
			summary: 'Chart of Accounts',
			description: 'Chart of Accounts',
			tags: ['report'],
			operationId: 'selectChartOfAccounts',
			parameters: [
				SE.parameter_query('own_uuid', 'own_uuid', SE.uuid()),
				SE.parameter_query('type', 'type', ['detail', 'summary']),
			],
			responses: {
				200: SE.response_schema(200, {
					account_name: SE.string('Account Name'),
					account_type: SE.string('Account Type'),
					balance: SE.number(610),
					parent_account: SE.string('Parent Account'),
					purchase_description_remarks: SE.string(
						'Purchase Description Remarks'
					),
					sale_description_remarks: SE.string(
						'Sale Description Remarks'
					),
				}),
			},
		},
	},
	'/report/chart-of-accounts-table-view': {
		get: {
			summary: 'Chart of Accounts Table View',
			description: 'Chart of Accounts Table View',
			tags: ['report'],
			operationId: 'selectChartOfAccountsTableView',
			parameters: [
				SE.parameter_query('own_uuid', 'own_uuid', SE.uuid()),
				SE.parameter_query('type', 'type', ['detail', 'summary']),
			],
			responses: {
				200: SE.response_schema(200, {
					account_name: SE.string('Account Name'),
					account_type: SE.string('Account Type'),
					balance: SE.number(610),
					parent_account: SE.string('Parent Account'),
					purchase_description_remarks: SE.string(
						'Purchase Description Remarks'
					),
					sale_description_remarks: SE.string(
						'Sale Description Remarks'
					),
				}),
			},
		},
	},
};
