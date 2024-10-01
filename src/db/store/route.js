import { Router } from 'express';

import * as materialOperations from './query/material.js';
import * as receive_entryOperations from './query/receive_entry.js';
import * as vendorOperations from './query/vendor.js';
import * as receiveOperations from './query/receive.js';
import * as issueOperations from './query/issue.js';

const storeRouter = Router();

storeRouter.post('/material', materialOperations.insert);
storeRouter.post('/material/:uuid', materialOperations.update);
storeRouter.post('/material/:uuid', materialOperations.remove);
storeRouter.get('/material', materialOperations.selectAll);
storeRouter.get('/material/:uuid', materialOperations.select);

storeRouter.post('/receive_entry', receive_entryOperations.insert);
storeRouter.post('/receive_entry/:uuid', receive_entryOperations.update);
storeRouter.post('/receive_entry/:uuid', receive_entryOperations.remove);
storeRouter.get('/receive_entry', receive_entryOperations.selectAll);
storeRouter.get('/receive_entry/:uuid', receive_entryOperations.select);

storeRouter.post('/vendor', vendorOperations.insert);
storeRouter.post('/vendor/:uuid', vendorOperations.update);
storeRouter.post('/vendor/:uuid', vendorOperations.remove);
storeRouter.get('/vendor', vendorOperations.selectAll);
storeRouter.get('/vendor/:uuid', vendorOperations.select);

storeRouter.post('/receive', receiveOperations.insert);
storeRouter.post('/receive/:uuid', receiveOperations.update);
storeRouter.post('/receive/:uuid', receiveOperations.remove);
storeRouter.get('/receive', receiveOperations.selectAll);
storeRouter.get('/receive/:uuid', receiveOperations.select);

storeRouter.post('/issue', issueOperations.insert);
storeRouter.post('/issue/:uuid', issueOperations.update);
storeRouter.post('/issue/:uuid', issueOperations.remove);
storeRouter.get('/issue', issueOperations.selectAll);
storeRouter.get('/issue/:uuid', issueOperations.select);

export { storeRouter };
