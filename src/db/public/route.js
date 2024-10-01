import { Router } from 'express';
import * as buyerOperations from './query/buyer.js';
import * as articleOperations from './query/article.js';
import * as categoryOperations from './query/category.js';

const publicRouter = Router();

publicRouter.post('/buyer', buyerOperations.insert);
publicRouter.post('/buyer/:uuid', buyerOperations.update);
publicRouter.post('/buyer/:uuid', buyerOperations.remove);
publicRouter.get('/buyer', buyerOperations.selectAll);
publicRouter.get('/buyer/:uuid', buyerOperations.select);

publicRouter.post('/article', articleOperations.insert);
publicRouter.post('/article/:uuid', articleOperations.update);
publicRouter.post('/article/:uuid', articleOperations.remove);
publicRouter.get('/article', articleOperations.selectAll);
publicRouter.get('/article/:uuid', articleOperations.select);

publicRouter.post('/category', categoryOperations.insert);
publicRouter.post('/category/:uuid', categoryOperations.update);
publicRouter.post('/category/:uuid', categoryOperations.remove);
publicRouter.get('/category', categoryOperations.selectAll);
publicRouter.get('/category/:uuid', categoryOperations.select);

export default publicRouter;
