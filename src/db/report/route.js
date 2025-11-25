import { Router } from 'express';

import * as ReportPaths from './path.js';

import * as reportOperations from './query/query.js';

import { balanceReport } from './acc_report/balance.js';
import {
	chartOfAccountsReport,
	chartOfAccountsReportTableView,
} from './acc_report/chart_of_accounts.js';

const reportRouter = Router();

// * store material report
reportRouter.get(
	'/store-material-report/:start_date/:end_date',
	reportOperations.storeMaterialReport
);

// * store vendor wise material report
reportRouter.get(
	'/store-vendor-wise-material-report/:start_date/:end_date',
	reportOperations.storeVendorWiseMaterialReport
);

// ! ACCOUNTS REPORTS
// * BALANCE REPORT
reportRouter.get('/acc-balance-report', balanceReport);
// * Chart of Accounts (Tree View)
reportRouter.get('/chart-of-accounts', chartOfAccountsReport);
// * Chart of Accounts (Table View)
reportRouter.get(
	'/chart-of-accounts-table-view',
	chartOfAccountsReportTableView
);

export const pathReport = {
	...ReportPaths.pathReport,
};

export const tagReport = [
	{
		name: 'report',
		description: 'Report Operations',
	},
];

export { reportRouter };
