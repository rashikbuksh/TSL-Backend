import { Router } from 'express';

import * as materialOperations from './query/material.js';
import * as receive_entryOperations from './query/receive_entry.js';
import * as vendorOperations from './query/vendor.js';
import * as receiveOperations from './query/receive.js';
import * as issueOperations from './query/issue.js';
import store from './schema.js';

const storeRouter = Router();

storeRouter.post('/material', materialOperations.insert);
storeRouter.put('/material/:uuid', materialOperations.update);
storeRouter.delete('/material/:uuid', materialOperations.remove);
storeRouter.get('/material', materialOperations.selectAll);
storeRouter.get('/material/:uuid', materialOperations.select);

storeRouter.post('/receive-entry', receive_entryOperations.insert);
storeRouter.put('/receive-entry/:uuid', receive_entryOperations.update);
storeRouter.delete('/receive-entry/:uuid', receive_entryOperations.remove);
storeRouter.get('/receive-entry', receive_entryOperations.selectAll);
storeRouter.get('/receive-entry/:uuid', receive_entryOperations.select);
storeRouter.get(
	'/receive-entry/by/:receive_uuid',
	receive_entryOperations.selectByReceiveUuid
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

storeRouter.post('/issue', issueOperations.insert);
storeRouter.put('/issue/:uuid', issueOperations.update);
storeRouter.delete('/issue/:uuid', issueOperations.remove);
storeRouter.get('/issue', issueOperations.selectAll);
storeRouter.get('/issue/:uuid', issueOperations.select);

export { storeRouter };
