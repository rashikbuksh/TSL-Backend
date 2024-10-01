import { Router } from 'express';
import * as buyerOperations from './query/buyer.js';
import * as articleOperations from './query/article.js';
import * as categoryOperations from './query/category.js';

const publicRouter = Router();

publicRouter.post('/buyer', buyerOperations.insert);
publicRouter.put('/buyer/:uuid', buyerOperations.update);
publicRouter.delete('/buyer/:uuid', buyerOperations.remove);
publicRouter.get('/buyer', buyerOperations.selectAll);
publicRouter.get('/buyer/:uuid', buyerOperations.select);

publicRouter.post('/article', articleOperations.insert);
publicRouter.put('/article/:uuid', articleOperations.update);
publicRouter.delete('/article/:uuid', articleOperations.remove);
publicRouter.get('/article', articleOperations.selectAll);
publicRouter.get('/article/:uuid', articleOperations.select);

publicRouter.post('/category', categoryOperations.insert);
publicRouter.put('/category/:uuid', categoryOperations.update);
publicRouter.delete('/category/:uuid', categoryOperations.remove);
publicRouter.get('/category', categoryOperations.selectAll);
publicRouter.get('/category/:uuid', categoryOperations.select);

export { publicRouter };
