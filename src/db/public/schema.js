import {
	index,
	integer,
	pgSchema,
	pgTable,
	primaryKey,
	text,
	unique,
} from 'drizzle-orm/pg-core';
import {
	DateTime,
	defaultUUID,
	PG_DECIMAL,
	uuid_primary,
} from '../variables.js';

import * as hrSchema from '../hr/schema.js';

export const buyer = pgTable('buyer', {
	uuid: uuid_primary,
	name: text('name').notNull().unique(),
	created_by: defaultUUID('created_by')
		.references(() => hrSchema.users.uuid)
		.notNull(),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export const article = pgTable(
	'article',
	{
		uuid: uuid_primary,
		buyer_uuid: defaultUUID('buyer_uuid').references(() => buyer.uuid),
		name: text('name').notNull(),
		created_by: defaultUUID('created_by')
			.references(() => hrSchema.users.uuid)
			.notNull(),
		created_at: DateTime('created_at').notNull(),
		updated_at: DateTime('updated_at').default(null),
		remarks: text('remarks').default(null),
	},
	(table) => {
		return {
			buyer_name_unique: unique({
				columns: [table.buyer_uuid, table.name],
			}),
			uuid_index: index({
				columns: [table.uuid],
			}),
		};
	}
);

export const category = pgTable('category', {
	uuid: uuid_primary,
	name: text('name').notNull().unique(),
	created_by: defaultUUID('created_by')
		.references(() => hrSchema.users.uuid)
		.notNull(),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export default category;
