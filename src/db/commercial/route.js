import { Router } from 'express';

import * as lcOperations from './query/lc.js';
import * as masterLcOperations from './query/master_lc.js';

const commercialRouter = Router();

commercialRouter.post('/lc', lcOperations.insert);
commercialRouter.put('/lc/:uuid', lcOperations.update);
commercialRouter.delete('/lc/:uuid', lcOperations.remove);
commercialRouter.get('/lc', lcOperations.selectAll);
commercialRouter.get('/lc/:uuid', lcOperations.select);

commercialRouter.post('/master_lc', masterLcOperations.insert);
commercialRouter.put('/master_lc/:uuid', masterLcOperations.update);
commercialRouter.delete('/master_lc/:uuid', masterLcOperations.remove);
commercialRouter.get('/master_lc', masterLcOperations.selectAll);
commercialRouter.get('/master_lc/:uuid', masterLcOperations.select);

export { commercialRouter };
