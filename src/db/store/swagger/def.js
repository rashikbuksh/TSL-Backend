import SE, { SED } from '../../../util/swagger_example.js';

//* ./schema.js#material

export const defMaterial = SED({
	required: [
		'uuid',
		'article_uuid',
		'category_uuid',
		'name_uuid',
		'color_uuid',
		'quantity',
		'unit_uuid',
		'size_uuid',
		'created_by',
		'created_at',
	],
	properties: {
		id: SE.number(1),
		uuid: SE.uuid(),
		article_uuid: SE.uuid(),
		category_uuid: SE.uuid(),
		name_uuid: SE.uuid(),
		color_uuid: SE.uuid(),
		quantity: SE.number(100),
		unit_uuid: SE.uuid(),
		size_uuid: SE.uuid(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Material',
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
	xml: 'Store/Vendor',
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
		'inventory_date',
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
		inventory_date: SE.date_time(),
	},
	xml: 'Store/Receive',
});

//* ./schema.js#issue_header

export const defIssueHeader = SED({
	required: ['uuid', 'section', 'issue_date', 'created_by', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		serial_no: SE.string('SN-001'),
		section: SE.string('cutting'),
		issue_date: SE.date_time(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/IssueHeader',
});

//* ./schema.js#issue

export const defIssue = SED({
	required: [
		'uuid',
		'issue_header_uuid',
		'material_uuid',
		'quantity',
		'created_by',
		'created_at',
	],
	properties: {
		uuid: SE.uuid(),
		issue_header_uuid: SE.uuid(),
		material_uuid: SE.uuid(),
		quantity: SE.number(10),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Issue',
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
	xml: 'Store/ReceiveEntry',
});

export const defUnit = SED({
	required: ['uuid', 'name', 'created_by', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Unit1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Unit',
});

export const defSize = SED({
	required: ['uuid', 'name', 'created_by', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Size1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Size',
});

export const defMaterialName = SED({
	required: ['uuid', 'name', 'created_by', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('MaterialName1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/MaterialName',
});

export const defColor = SED({
	required: ['uuid', 'name', 'created_by', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Color1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Color',
});

// * Marge All

export const defStore = {
	material: defMaterial,
	vendor: defVendor,
	receive: defReceive,
	issue_header: defIssueHeader,
	issue: defIssue,
	receive_entry: defReceiveEntry,
	unit: defUnit,
	size: defSize,
	material_name: defMaterialName,
	color: defColor,
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
		name: 'store.issue_header',
		description: 'Operations about issue header',
	},
	{
		name: 'store.issue',
		description: 'Operations about issue',
	},
	{
		name: 'store.receive_entry',
		description: 'Operations about receive entry',
	},
	{
		name: 'store.unit',
		description: 'Operations about unit',
	},
	{
		name: 'store.size',
		description: 'Operations about size',
	},
	{
		name: 'store.material_name',
		description: 'Operations about material name',
	},
	{
		name: 'store.color',
		description: 'Operations about color',
	},
];
