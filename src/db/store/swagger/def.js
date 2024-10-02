import SE, { SED } from '../../../util/swagger_example.js';

//* ./schema.js#material

export const defMaterial = SED({
	required: [
		'uuid',
		'article_uuid',
		'category_uuid',
		'name',
		'color',
		'quantity',
		'unit',
		'created_by',
		'created_at',
	],
	properties: {
		uuid: SE.uuid(),
		article_uuid: SE.uuid(),
		category_uuid: SE.uuid(),
		name: SE.string('Material1'),
		color: SE.string('Color1'),
		quantity: SE.number(100),
		unit: SE.string('kg'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Production/Material',
});

//* ./schema.js#vendor

export const defVendor = SED({
	required: [
		'uuid',
		'name',
		'person',
		'phone',
		'address',
		'created_by',
		'created_at',
	],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Vendor1'),
		person: SE.string('Person1'),
		phone: SE.string('1234567890'),
		address: SE.string('Address1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Production/Vendor',
});

//* ./schema.js#receive

export const defReceive = SED({
	required: [
		'uuid',
		'vendor_uuid',
		'lc_uuid',
		'is_import',
		'commercial_invoice_number',
		'commercial_invoice_value',
		'convention_rate',
		'created_by',
		'created_at',
	],
	properties: {
		uuid: SE.uuid(),
		vendor_uuid: SE.uuid(),
		lc_uuid: SE.uuid(),
		is_import: SE.integer(),
		commercial_invoice_number: SE.string('INV-001'),
		commercial_invoice_value: SE.number(1000),
		convention_rate: SE.number(85),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Production/Receive',
});

//* ./schema.js#issue

export const defIssue = SED({
	required: [
		'uuid',
		'material_uuid',
		'issue_quantity',
		'created_by',
		'created_at',
	],
	properties: {
		uuid: SE.uuid(),
		material_uuid: SE.uuid(),
		issue_quantity: SE.number(10),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Production/Issue',
});

//* ./schema.js#receive_entry

export const defReceiveEntry = SED({
	required: [
		'uuid',
		'receive_uuid',
		'material_uuid',
		'quantity',
		'price',
		'created_by',
		'created_at',
	],
	properties: {
		uuid: SE.uuid(),
		receive_uuid: SE.uuid(),
		material_uuid: SE.uuid(),
		quantity: SE.number(10),
		price: SE.number(100),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Production/ReceiveEntry',
});

// * Marge All

export const defStore = {
	material: defMaterial,
	vendor: defVendor,
	receive: defReceive,
	issue: defIssue,
	receive_entry: defReceiveEntry,
};

// * Tag

export const tagStore = [
	{
		name: 'store.material',
		description: 'Everything about your Materials',
	},
	{
		name: 'store.vendor',
		description: 'Operations about vendor',
	},
	{
		name: 'store.receive',
		description: 'Operations about receive',
	},
	{
		name: 'store.issue',
		description: 'Operations about issue',
	},
	{
		name: 'store.receive_entry',
		description: 'Operations about receive entry',
	},
];
