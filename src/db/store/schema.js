import { integer, pgSchema, pgTable, text } from 'drizzle-orm/pg-core';
import {
	DateTime,
	defaultUUID,
	PG_DECIMAL,
	uuid_primary,
} from '../variables.js';

import * as hrSchema from '../hr/schema.js';
import * as publicSchema from '../public/schema.js';
import * as commercialSchema from '../commercial/schema.js';

const store = pgSchema('store');

export const material = store.table('material', {
	uuid: uuid_primary,
	article_uuid: defaultUUID('article_uuid').references(
		() => publicSchema.article.uuid
	),
	category_uuid: defaultUUID('category_uuid').references(
		() => publicSchema.category.uuid
	),
	name: text('name').notNull(),
	created_by: defaultUUID('created_by').references(() => hrSchema.users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export const vendor = store.table('vendor', {
	uuid: uuid_primary,
	name: text('name').notNull(),
	person: text('person').notNull(),
	phone: text('phone').notNull(),
	address: text('address').notNull(),
	created_by: defaultUUID('created_by').references(() => hrSchema.users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export const receive = store.table('receive', {
	uuid: uuid_primary,
	vendor_uuid: defaultUUID('vendor_uuid').references(() => vendor.uuid),
	lc_uuid: defaultUUID('lc_uuid').references(() => commercialSchema.lc.uuid),
	is_import: integer('is_import').default(0),
	commercial_invoice_number: text('commercial_invoice_number').notNull(),
	commercial_invoice_value: PG_DECIMAL('commercial_invoice_value').default(0),
	convention_rate: PG_DECIMAL('convention_rate').notNull(),
	created_by: defaultUUID('created_by').references(() => hrSchema.users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export const issue = store.table('issue', {
	uuid: uuid_primary,
	material_uuid: defaultUUID('material_uuid').references(() => material.uuid),
	quantity: PG_DECIMAL('quantity').notNull(),
	created_by: defaultUUID('created_by').references(() => hrSchema.users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export const receive_entry = store.table('receive_entry', {
	uuid: uuid_primary,
	receive_uuid: defaultUUID('receive_uuid').references(() => receive.uuid),
	material_uuid: defaultUUID('material_uuid').references(() => material.uuid),
	quantity: PG_DECIMAL('quantity').notNull(),
	price: PG_DECIMAL('price').notNull(),
	created_by: defaultUUID('created_by').references(() => hrSchema.users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export default store;