import { integer, pgSchema, pgTable, text } from 'drizzle-orm/pg-core';
import {
	DateTime,
	defaultUUID,
	PG_DECIMAL,
	uuid_primary,
} from '../variables.js';

import * as hrSchema from '../hr/schema.js';

const commercial = pgSchema('commercial');

export const lc = commercial.table('lc', {
	uuid: uuid_primary,
	number: text('number').notNull(),
	date: DateTime('date').notNull(),
	created_by: defaultUUID('created_by')
		.references(() => hrSchema.users.uuid)
		.notNull(),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export default commercial;
