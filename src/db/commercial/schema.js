import { integer, pgSchema, pgTable, text } from 'drizzle-orm/pg-core';
import {
	DateTime,
	defaultUUID,
	PG_DECIMAL,
	uuid_primary,
} from '../variables.js';

import * as hrSchema from '../hr/schema.js';
import * as storeSchema from '../store/schema.js';

const commercial = pgSchema('commercial');

export const lc = commercial.table('lc', {
	uuid: uuid_primary,
	number: text('number').notNull(),
	date: DateTime('date').notNull(),
	master_lc_uuid: defaultUUID('master_lc_uuid')
		.references(() => master_lc.uuid)
		.default(null),
	vendor_uuid: defaultUUID('vendor_uuid')
		.references(() => storeSchema.vendor.uuid)
		.default(null),
	value: PG_DECIMAL('value').default(0),
	unit: text('unit').default(null),
	lien_bank: text('lien_bank').default(null),
	created_by: defaultUUID('created_by')
		.references(() => hrSchema.users.uuid)
		.notNull(),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export const master_lc = commercial.table('master_lc', {
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
