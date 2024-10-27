import SE, { SED } from '../../../util/swagger_example.js';

//* ./schema.js#lc

export const defLc = SED({
	required: ['uuid', 'number', 'date', 'created_by', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		number: SE.string('LC-001'),
		date: SE.date_time(),
		master_lc_uuid: SE.uuid(),
		vendor_uuid: SE.uuid(),
		value: SE.number(),
		unit: SE.string('kg'),
		lien_bank: SE.string('lien_bank'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Commercial/Lc',
});

export const defMasterLc = SED({
	required: ['uuid', 'number', 'date', 'created_by', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		number: SE.string('LC-001'),
		date: SE.date_time(),
		value: SE.number(),
		lien_bank: SE.string('lien_bank'),
		payment_terms: SE.integer(),
		unit: SE.string('kg'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Commercial/MasterLc',
});

// * Marge All

export const defCommercial = {
	Lc: defLc,
	MasterLc: defMasterLc,
};

// * Tag

export const tagCommercial = [
	{
		name: 'commercial.lc',
		description: 'Commercial',
	},
	{
		name: 'commercial.master_lc',
		description: 'Commercial',
	},
];
