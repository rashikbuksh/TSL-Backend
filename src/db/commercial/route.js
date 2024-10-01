import { Router } from 'express';

import * as lcOperations from './query/lc.js';

const commercialRouter = Router();

commercialRouter.post('/lc', lcOperations.insert);
commercialRouter.post('/lc/:uuid', lcOperations.update);
commercialRouter.post('/lc/:uuid', lcOperations.remove);
commercialRouter.get('/lc', lcOperations.selectAll);
commercialRouter.get('/lc/:uuid', lcOperations.select);

export { commercialRouter };
