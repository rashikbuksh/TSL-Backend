import SE, { SED } from '../../../util/swagger_example.js';

//* ./schema.js#lc

export const defLc = SED({
	required: ['uuid', 'number', 'date', 'created_by', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		number: SE.string('LC-001'),
		date: SE.date_time(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Commercial/Lc',
});

// * Marge All

export const defCommercial = {
	Lc: defLc,
};

// * Tag

export const tagCommercial = [
	{
		name: 'commercial.Lc',
		description: 'Commercial',
	},
];
