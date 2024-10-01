import SE, { SED } from '../../../util/swagger_example.js';

//* ./schema.js#buyer

export const defBuyer = SED({
	required: ['uuid', 'name', 'created_by', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Buyer1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Commercial/Buyer',
});

//* ./schema.js#article

export const defArticle = SED({
	required: ['uuid', 'buyer_uuid', 'name', 'created_by', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		buyer_uuid: SE.uuid(),
		name: SE.string('Article1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Commercial/Article',
});

//* ./schema.js#category

export const defCategory = SED({
	required: ['uuid', 'name', 'created_by', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Category1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Commercial/Category',
});

// * Marge All

export const defPublic = {
	Buyer: defBuyer,
	Article: defArticle,
	Category: defCategory,
};

// * Tag

export const tagPublic = [
	{
		name: 'public.Buyer',
		description: 'Everything about your Buyers',
	},
	{
		name: 'public.Article',
		description: 'Everything about your Articles',
	},
	{
		name: 'public.Category',
		description: 'Everything about your Categories',
	},
];
