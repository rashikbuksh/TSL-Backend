import express from 'express';

import { hrRouter } from '../db/hr/route.js';
import { publicRouter } from '../db/public/route.js';
import { storeRouter } from '../db/store/route.js';
import { commercialRouter } from '../db/commercial/route.js';
import { otherRouter } from '../db/other/route.js';

const route = express.Router();

// All the routes are defined here

// use the /hr route and /delivery route as reference, change the routes accordingly, also in query folder, then test with postman

// TODO: Add your routes here
// FIXME: Add your routes here
// NOTE: Add your routes here
// INFO: Add your routes here
// WARNING: Add your routes here
// REVIEW: Add your routes here

// hr routes
route.use('/hr', hrRouter);

// public routes
route.use('/public', publicRouter);

// store routes
route.use('/store', storeRouter);

// commercial routes
route.use('/commercial', commercialRouter);

// others routes
route.use('/other', otherRouter);

export default route;
