import { Router } from 'express';

import * as materialOperations from './query/material.js';
import * as receive_entryOperations from './query/receive_entry.js';
import * as vendorOperations from './query/vendor.js';
import * as receiveOperations from './query/receive.js';
import * as issueOperations from './query/issue.js';
import * as materialNameOperations from './query/material_name.js';
import * as unitOperations from './query/unit.js';
import * as sizeOperations from './query/size.js';
import * as colorOperations from './query/color.js';
import * as issueHeaderOperations from './query/issue_header.js';
import store from './schema.js';

const storeRouter = Router();

storeRouter.post('/material', materialOperations.insert);
storeRouter.put('/material/:uuid', materialOperations.update);
storeRouter.delete('/material/:uuid', materialOperations.remove);
storeRouter.get('/material', materialOperations.selectAll);
storeRouter.get('/material/:uuid', materialOperations.select);

storeRouter.post('/receive-entry', receive_entryOperations.insertMany);
storeRouter.put('/receive-entry/:uuid', receive_entryOperations.update);
storeRouter.delete('/receive-entry/:uuid', receive_entryOperations.remove);
storeRouter.get('/receive-entry', receive_entryOperations.selectAll);
storeRouter.get('/receive-entry/:uuid', receive_entryOperations.select);
storeRouter.get(
	'/receive-entry/by/:receive_uuid',
	receive_entryOperations.selectByReceiveUuid
);
storeRouter.put(
	'/receive-entry/for/receive-log/:uuid',
	receive_entryOperations.updateForReceiveEntryLog
);

storeRouter.post('/vendor', vendorOperations.insert);
storeRouter.put('/vendor/:uuid', vendorOperations.update);
storeRouter.delete('/vendor/:uuid', vendorOperations.remove);
storeRouter.get('/vendor', vendorOperations.selectAll);
storeRouter.get('/vendor/:uuid', vendorOperations.select);

storeRouter.post('/receive', receiveOperations.insert);
storeRouter.put('/receive/:uuid', receiveOperations.update);
storeRouter.delete('/receive/:uuid', receiveOperations.remove);
storeRouter.get('/receive', receiveOperations.selectAll);
storeRouter.get('/receive/:uuid', receiveOperations.select);
storeRouter.get(
	'/receive-entry-details/by/:receive_uuid',
	receiveOperations.selectReceiveEntryDetails
);
storeRouter.get(
	'/receive-with-entry',
	receiveOperations.selectAllReceiveWithEntry
);

storeRouter.post('/issue-header', issueHeaderOperations.insert);
storeRouter.put('/issue-header/:uuid', issueHeaderOperations.update);
storeRouter.delete('/issue-header/:uuid', issueHeaderOperations.remove);
storeRouter.get('/issue-header', issueHeaderOperations.selectAll);
storeRouter.get('/issue-header/:uuid', issueHeaderOperations.select);
storeRouter.get(
	'/issue-details/by/:issue_header_uuid',
	issueHeaderOperations.selectIssueDetails
);

storeRouter.post('/issue', issueOperations.insert);
storeRouter.put('/issue/:uuid', issueOperations.update);
storeRouter.delete('/issue/:uuid', issueOperations.remove);
storeRouter.get('/issue', issueOperations.selectAll);
storeRouter.get('/issue/:uuid', issueOperations.select);
storeRouter.get(
	'/issue/by/:issue_header_uuid',
	issueOperations.selectByIssueHeader
);

storeRouter.post('/material-name', materialNameOperations.insert);
storeRouter.put('/material-name/:uuid', materialNameOperations.update);
storeRouter.delete('/material-name/:uuid', materialNameOperations.remove);
storeRouter.get('/material-name', materialNameOperations.selectAll);
storeRouter.get('/material-name/:uuid', materialNameOperations.select);

storeRouter.post('/unit', unitOperations.insert);
storeRouter.put('/unit/:uuid', unitOperations.update);
storeRouter.delete('/unit/:uuid', unitOperations.remove);
storeRouter.get('/unit', unitOperations.selectAll);
storeRouter.get('/unit/:uuid', unitOperations.select);

storeRouter.post('/size', sizeOperations.insert);
storeRouter.put('/size/:uuid', sizeOperations.update);
storeRouter.delete('/size/:uuid', sizeOperations.remove);
storeRouter.get('/size', sizeOperations.selectAll);
storeRouter.get('/size/:uuid', sizeOperations.select);

storeRouter.post('/color', colorOperations.insert);
storeRouter.put('/color/:uuid', colorOperations.update);
storeRouter.delete('/color/:uuid', colorOperations.remove);
storeRouter.get('/color', colorOperations.selectAll);
storeRouter.get('/color/:uuid', colorOperations.select);

export { storeRouter };
