import { Router } from 'express';

import * as lcOperations from './query/lc.js';
import * as masterLcOperations from './query/master_lc.js';

const commercialRouter = Router();

commercialRouter.post('/lc', lcOperations.insert);
commercialRouter.put('/lc/:uuid', lcOperations.update);
commercialRouter.delete('/lc/:uuid', lcOperations.remove);
commercialRouter.get('/lc', lcOperations.selectAll);
commercialRouter.get('/lc/:uuid', lcOperations.select);

commercialRouter.post('/master-lc', masterLcOperations.insert);
commercialRouter.put('/master-lc/:uuid', masterLcOperations.update);
commercialRouter.delete('/master-lc/:uuid', masterLcOperations.remove);
commercialRouter.get('/master-lc', masterLcOperations.selectAll);
commercialRouter.get('/master-lc/:uuid', masterLcOperations.select);

export { commercialRouter };
