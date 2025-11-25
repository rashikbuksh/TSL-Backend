import { Router } from 'express';

import * as otherOperations from './query/query.js';
import * as accOperations from './query/accounts.js';

import { pathPublic, pathHr, pathStore, pathCommercial } from './path.js';
import { pathAcc } from '../acc/swagger/route.js';

const otherRouter = Router();

// WARNING: public
// buyer , category, article
otherRouter.get('/buyer/value/label', otherOperations.selectBuyer);
otherRouter.get('/category/value/label', otherOperations.selectCategory);
otherRouter.get('/article/value/label', otherOperations.selectArticle);

// WARNING: hr
// user, department, designation
otherRouter.get('/department/value/label', otherOperations.selectDepartment);
otherRouter.get('/hr/user/value/label', otherOperations.selectHrUser);
otherRouter.get('/designation/value/label', otherOperations.selectDesignation);

// WARNING: store
// material, vendor, receive
otherRouter.get('/material/value/label', otherOperations.selectMaterial);
otherRouter.get(
	'/material-name/value/label',
	otherOperations.selectMaterialName
);
otherRouter.get('/color/value/label', otherOperations.selectColor);
otherRouter.get('/size/value/label', otherOperations.selectSize);
otherRouter.get('/unit/value/label', otherOperations.selectUnit);
otherRouter.get('/vendor/value/label', otherOperations.selectVendor);
// otherRouter.get('/receive/value/label', otherOperations.selectReceive);

// WARNING: commercial
// lc, master-lc
otherRouter.get('/lc/value/label', otherOperations.selectLc);
otherRouter.get('/master-lc/value/label', otherOperations.selectMasterLc);

// * Accounts

otherRouter.get('/accounts/head/value/label', accOperations.selectHead);

otherRouter.get('/accounts/currency/value/label', accOperations.selectCurrency);

otherRouter.get('/accounts/group/value/label', accOperations.selectGroup);

otherRouter.get('/accounts/ledger/value/label', accOperations.selectLedger);

otherRouter.get(
	'/accounts/cost-center/value/label',
	accOperations.selectCostCenter
);

otherRouter.get('/accounts/table-name', accOperations.getAccountsTableNames);

otherRouter.get(
	'/accounts/table-data/by/:table_name',
	accOperations.getSelectedTableData
);

export const pathOther = {
	...pathPublic,
	...pathHr,
	...pathStore,
	...pathCommercial,
	...pathAcc,
};

export const tagOther = [
	{
		name: 'other',
		description: 'Other operations',
	},
];

export { otherRouter };
