import { and, asc, desc, eq, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { handleError, validateRequest } from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';
import * as publicSchema from '../../public/schema.js';
import { decimalToNumber } from '../../variables.js';
import {
	color,
	material,
	material_name,
	receive,
	receive_entry,
	size,
	unit,
	vendor,
} from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	// console.log('req.body', req.body);
	let new_material_uuid = nanoid(15);

	let {
		quantity,
		created_by,
		created_at,
		updated_at,
		remarks,
		article_uuid,
		category_uuid,
		name_uuid,
		color_uuid,
		unit_uuid,
		size_uuid,
		index,
	} = req.body;

	// check if article_uuid exists if not then insert into article table
	const articlePromise = db
		.select({
			uuid: publicSchema.article.uuid,
		})
		.from(publicSchema.article)
		.where(eq(publicSchema.article.name, article_uuid));

	const articleResult = await articlePromise;

	if (articleResult.length === 0 && article_uuid) {
		const articleInsertPromise = db
			.insert(publicSchema.article)
			.values({
				uuid: nanoid(15),
				name: article_uuid,
				buyer_uuid: null,
				created_by,
				created_at,
				updated_at,
			})
			.returning({ insertedUuid: publicSchema.article.uuid });

		const articleInsertResult = await articleInsertPromise;
		article_uuid = articleInsertResult[0].insertedUuid;
	} else if (articleResult.length > 0) {
		article_uuid = articleResult[0].uuid;
	}

	// check if category_uuid exists if not then insert into category table
	const categoryPromise = db
		.select({
			uuid: publicSchema.category.uuid,
		})
		.from(publicSchema.category)
		.where(eq(publicSchema.category.name, category_uuid));

	const categoryResult = await categoryPromise;

	if (categoryResult.length === 0 && category_uuid) {
		const categoryInsertPromise = db
			.insert(publicSchema.category)
			.values({
				uuid: nanoid(15),
				name: category_uuid,
				created_by,
				created_at,
				updated_at,
			})
			.returning({ insertedUuid: publicSchema.category.uuid });
		const categoryInsertResult = await categoryInsertPromise;
		category_uuid = categoryInsertResult[0].insertedUuid;
	} else if (categoryResult.length > 0) {
		category_uuid = categoryResult[0].uuid;
	}

	// check if name_uuid exists if not then insert into material_name table
	const namePromise = db
		.select({
			uuid: material_name.uuid,
		})
		.from(material_name)
		.where(eq(material_name.name, name_uuid));

	const nameResult = await namePromise;

	if (nameResult.length === 0 && name_uuid) {
		const nameInsertPromise = db
			.insert(material_name)
			.values({
				uuid: nanoid(15),
				name: name_uuid,
				created_by,
				created_at,
				updated_at,
				remarks,
			})
			.returning({ insertedUuid: material_name.uuid });
		const nameInsertResult = await nameInsertPromise;
		name_uuid = nameInsertResult[0].insertedUuid;
	} else if (nameResult.length > 0) {
		name_uuid = nameResult[0].uuid;
	}
	// check if color_uuid exists if not then insert into color table
	const colorPromise = db
		.select({
			uuid: color.uuid,
		})
		.from(color)
		.where(eq(color.name, color_uuid));
	const colorResult = await colorPromise;
	if (colorResult.length === 0 && color_uuid) {
		const colorInsertPromise = db
			.insert(color)
			.values({
				uuid: nanoid(15),
				name: color_uuid,
				created_by,
				created_at,
				updated_at,
				remarks,
			})
			.returning({ insertedUuid: color.uuid });
		const colorInsertResult = await colorInsertPromise;
		color_uuid = colorInsertResult[0].insertedUuid;
	} else if (colorResult.length > 0) {
		color_uuid = colorResult[0].uuid;
	}
	// check if unit_uuid exists if not then insert into unit table
	const unitPromise = db
		.select({
			uuid: unit.uuid,
		})
		.from(unit)
		.where(eq(unit.name, unit_uuid));
	const unitResult = await unitPromise;
	if (unitResult.length === 0 && unit_uuid) {
		const unitInsertPromise = db
			.insert(unit)
			.values({
				uuid: nanoid(15),
				name: unit_uuid,
				created_by,
				created_at,
				updated_at,
				remarks,
			})
			.returning({ insertedUuid: unit.uuid });
		const unitInsertResult = await unitInsertPromise;
		unit_uuid = unitInsertResult[0].insertedUuid;
	} else if (unitResult.length > 0) {
		unit_uuid = unitResult[0].uuid;
	}

	// check if size_uuid exists if not then insert into size table
	const sizePromise = db
		.select({
			uuid: size.uuid,
		})
		.from(size)
		.where(eq(size.name, size_uuid));

	const sizeResult = await sizePromise;

	if (sizeResult.length === 0 && size_uuid) {
		const sizeInsertPromise = db
			.insert(size)
			.values({
				uuid: nanoid(15),
				name: size_uuid,
				created_by,
				created_at,
				updated_at,
				remarks,
			})
			.returning({ insertedUuid: size.uuid });
		const sizeInsertResult = await sizeInsertPromise;
		size_uuid = sizeInsertResult[0].insertedUuid;
	} else if (sizeResult.length > 0) {
		size_uuid = sizeResult[0].uuid;
	}

	// check if material exists with these parameters article_uuid, category_uuid, name_uuid, color_uuid, unit_uuid, size_uuid,
	const materialPromise = db
		.select({
			uuid: material.uuid,
		})
		.from(material)
		.where(
			and(
				eq(material.article_uuid, article_uuid),
				eq(material.category_uuid, category_uuid),
				eq(material.name_uuid, name_uuid),
				eq(material.color_uuid, color_uuid),
				eq(material.unit_uuid, unit_uuid),
				eq(material.size_uuid, size_uuid)
			)
		);

	const materialResult = await materialPromise;

	let material_uuid;

	if (materialResult.length === 0) {
		const materialInsertPromise = db
			.insert(material)
			.values({
				uuid: new_material_uuid,
				article_uuid,
				category_uuid,
				name_uuid,
				color_uuid,
				size_uuid,
				unit_uuid,
				created_by,
				created_at,
				updated_at,
				remarks,
			})
			.returning({ insertedUuid: material.uuid });

		const materialInsertResult = await materialInsertPromise;
		material_uuid = materialInsertResult[0].insertedUuid;
	} else {
		material_uuid = materialResult[0].uuid;
	}

	const receive_entry_values = {
		uuid: req.body.uuid,
		receive_uuid: req.body.receive_uuid,
		material_uuid: material_uuid,
		quantity,
		price: req.body.price,
		created_by,
		created_at,
		updated_at,
		remarks,
		index,
	};

	const receive_entryPromise = db
		.insert(receive_entry)
		.values(receive_entry_values)
		.returning({ insertedUuid: receive_entry.uuid });

	try {
		const data = await receive_entryPromise;

		const materialPromise = db
			.select({
				name: material_name.name,
			})
			.from(material_name)
			.leftJoin(material, eq(material_name.uuid, material.name_uuid))
			.leftJoin(
				receive_entry,
				eq(material.uuid, receive_entry.material_uuid)
			)
			.where(eq(receive_entry.uuid, data[0].insertedUuid));

		const materialData = await materialPromise;

		const toast = {
			status: 201,
			type: 'insert',
			message: `${materialData[0].name} inserted`,
		};
		return await res.status(201).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function insertMany(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	// console.log('req.body', req.body);

	const processedItems = [];

	// Process each item sequentially to avoid UUID conflicts
	for (const item of req.body) {
		let new_material_uuid = nanoid(15); // Generate unique UUID for each material
		// check if article_uuid exists if not then insert into article table
		// If article_uuid is empty, null, or undefined, use a default "No Article" UUID
		if (!item.article_uuid || item.article_uuid.trim() === '') {
			// First check if "No Article" record exists, if not create it
			const noArticlePromise = db
				.select({
					uuid: publicSchema.article.uuid,
				})
				.from(publicSchema.article)
				.where(eq(publicSchema.article.name, 'No Article'));

			const noArticleResult = await noArticlePromise;
			if (noArticleResult.length === 0) {
				const noArticleInsertPromise = db
					.insert(publicSchema.article)
					.values({
						uuid: nanoid(15),
						name: 'No Article',
						buyer_uuid: null,
						created_by: item.created_by,
						created_at: item.created_at,
						updated_at: item.updated_at,
						remarks: 'Default no article record',
					})
					.returning({ insertedUuid: publicSchema.article.uuid });
				const noArticleInsertResult = await noArticleInsertPromise;
				item.article_uuid = noArticleInsertResult[0].insertedUuid;
			} else {
				item.article_uuid = noArticleResult[0].uuid;
			}
		} else {
			const articlePromise = db
				.select({
					uuid: publicSchema.article.uuid,
				})
				.from(publicSchema.article)
				.where(eq(publicSchema.article.name, item.article_uuid));

			const articleResult = await articlePromise;

			if (articleResult.length === 0 && item.article_uuid) {
				const articleInsertPromise = db
					.insert(publicSchema.article)
					.values({
						uuid: nanoid(15),
						name: item.article_uuid,
						buyer_uuid: null,
						created_by: item.created_by,
						created_at: item.created_at,
						updated_at: item.updated_at,
						remarks: item.remarks,
					})
					.returning({ insertedUuid: publicSchema.article.uuid });

				const articleInsertResult = await articleInsertPromise;
				item.article_uuid = articleInsertResult[0].insertedUuid;
			} else if (articleResult.length > 0) {
				item.article_uuid = articleResult[0].uuid;
			}
		}

		// check if category_uuid exists if not then insert into category table
		// If category_uuid is empty, null, or undefined, use a default "No Category" UUID
		if (!item.category_uuid || item.category_uuid.trim() === '') {
			// First check if "No Category" record exists, if not create it
			const noCategoryPromise = db
				.select({
					uuid: publicSchema.category.uuid,
				})
				.from(publicSchema.category)
				.where(eq(publicSchema.category.name, 'No Category'));

			const noCategoryResult = await noCategoryPromise;
			if (noCategoryResult.length === 0) {
				const noCategoryInsertPromise = db
					.insert(publicSchema.category)
					.values({
						uuid: nanoid(15),
						name: 'No Category',
						created_by: item.created_by,
						created_at: item.created_at,
						updated_at: item.updated_at,
						remarks: 'Default no category record',
					})
					.returning({ insertedUuid: publicSchema.category.uuid });
				const noCategoryInsertResult = await noCategoryInsertPromise;
				item.category_uuid = noCategoryInsertResult[0].insertedUuid;
			} else {
				item.category_uuid = noCategoryResult[0].uuid;
			}
		} else {
			const categoryPromise = db
				.select({
					uuid: publicSchema.category.uuid,
				})
				.from(publicSchema.category)
				.where(eq(publicSchema.category.name, item.category_uuid));

			const categoryResult = await categoryPromise;

			if (categoryResult.length === 0 && item.category_uuid) {
				const categoryInsertPromise = db
					.insert(publicSchema.category)
					.values({
						uuid: nanoid(15),
						name: item.category_uuid,
						created_by: item.created_by,
						created_at: item.created_at,
						updated_at: item.updated_at,
					})
					.returning({ insertedUuid: publicSchema.category.uuid });
				const categoryInsertResult = await categoryInsertPromise;
				item.category_uuid = categoryInsertResult[0].insertedUuid;
			} else if (categoryResult.length > 0) {
				item.category_uuid = categoryResult[0].uuid;
			}
		}

		// check if name_uuid exists if not then insert into material_name table
		// Material name is required - throw error if not provided
		if (!item.name_uuid || item.name_uuid.trim() === '') {
			throw new Error('Material name is required and cannot be empty');
		}

		const namePromise = db
			.select({
				uuid: material_name.uuid,
			})
			.from(material_name)
			.where(eq(material_name.name, item.name_uuid));

		const nameResult = await namePromise;

		if (nameResult.length === 0 && item.name_uuid) {
			const nameInsertPromise = db
				.insert(material_name)
				.values({
					uuid: nanoid(15),
					name: item.name_uuid,
					created_by: item.created_by,
					created_at: item.created_at,
					updated_at: item.updated_at,
					remarks: item.remarks,
				})
				.returning({ insertedUuid: material_name.uuid });
			const nameInsertResult = await nameInsertPromise;
			item.name_uuid = nameInsertResult[0].insertedUuid;
		} else if (nameResult.length > 0) {
			item.name_uuid = nameResult[0].uuid;
		}
		// check if color_uuid exists if not then insert into color table
		// If color_uuid is empty, null, or undefined, use a default "No Color" UUID
		if (!item.color_uuid || item.color_uuid.trim() === '') {
			// First check if "No Color" record exists, if not create it
			const noColorPromise = db
				.select({
					uuid: color.uuid,
				})
				.from(color)
				.where(eq(color.name, 'No Color'));

			const noColorResult = await noColorPromise;
			if (noColorResult.length === 0) {
				const noColorInsertPromise = db
					.insert(color)
					.values({
						uuid: nanoid(15),
						name: 'No Color',
						created_by: item.created_by,
						created_at: item.created_at,
						updated_at: item.updated_at,
						remarks: 'Default no color record',
					})
					.returning({ insertedUuid: color.uuid });
				const noColorInsertResult = await noColorInsertPromise;
				item.color_uuid = noColorInsertResult[0].insertedUuid;
			} else {
				item.color_uuid = noColorResult[0].uuid;
			}
		} else {
			const colorPromise = db
				.select({
					uuid: color.uuid,
				})
				.from(color)
				.where(eq(color.name, item.color_uuid));

			const colorResult = await colorPromise;
			if (colorResult.length === 0 && item.color_uuid) {
				const colorInsertPromise = db
					.insert(color)
					.values({
						uuid: nanoid(15),
						name: item.color_uuid,
						created_by: item.created_by,
						created_at: item.created_at,
						updated_at: item.updated_at,
						remarks: item.remarks,
					})
					.returning({ insertedUuid: color.uuid });
				const colorInsertResult = await colorInsertPromise;
				item.color_uuid = colorInsertResult[0].insertedUuid;
			} else if (colorResult.length > 0) {
				item.color_uuid = colorResult[0].uuid;
			}
		}
		// check if unit_uuid exists if not then insert into unit table
		// If unit_uuid is empty, null, or undefined, use a default "No Unit" UUID
		if (!item.unit_uuid || item.unit_uuid.trim() === '') {
			// First check if "No Unit" record exists, if not create it
			const noUnitPromise = db
				.select({
					uuid: unit.uuid,
				})
				.from(unit)
				.where(eq(unit.name, 'No Unit'));

			const noUnitResult = await noUnitPromise;
			if (noUnitResult.length === 0) {
				const noUnitInsertPromise = db
					.insert(unit)
					.values({
						uuid: nanoid(15),
						name: 'No Unit',
						created_by: item.created_by,
						created_at: item.created_at,
						updated_at: item.updated_at,
						remarks: 'Default no unit record',
					})
					.returning({ insertedUuid: unit.uuid });
				const noUnitInsertResult = await noUnitInsertPromise;
				item.unit_uuid = noUnitInsertResult[0].insertedUuid;
			} else {
				item.unit_uuid = noUnitResult[0].uuid;
			}
		} else {
			const unitPromise = db
				.select({
					uuid: unit.uuid,
				})
				.from(unit)
				.where(eq(unit.name, item.unit_uuid));

			const unitResult = await unitPromise;
			if (unitResult.length === 0 && item.unit_uuid) {
				const unitInsertPromise = db
					.insert(unit)
					.values({
						uuid: nanoid(15),
						name: item.unit_uuid,
						created_by: item.created_by,
						created_at: item.created_at,
						updated_at: item.updated_at,
						remarks: item.remarks,
					})
					.returning({ insertedUuid: unit.uuid });
				const unitInsertResult = await unitInsertPromise;
				item.unit_uuid = unitInsertResult[0].insertedUuid;
			} else if (unitResult.length > 0) {
				item.unit_uuid = unitResult[0].uuid;
			}
		}

		// check if size_uuid exists if not then insert into size table
		// If size_uuid is empty, null, or undefined, use a default "No Size" UUID
		if (!item.size_uuid || item.size_uuid.trim() === '') {
			// First check if "No Size" record exists, if not create it
			const noSizePromise = db
				.select({
					uuid: size.uuid,
				})
				.from(size)
				.where(eq(size.name, 'No Size'));

			const noSizeResult = await noSizePromise;
			if (noSizeResult.length === 0) {
				const noSizeInsertPromise = db
					.insert(size)
					.values({
						uuid: nanoid(15),
						name: 'No Size',
						created_by: item.created_by,
						created_at: item.created_at,
						updated_at: item.updated_at,
						remarks: 'Default no size record',
					})
					.returning({ insertedUuid: size.uuid });
				const noSizeInsertResult = await noSizeInsertPromise;
				item.size_uuid = noSizeInsertResult[0].insertedUuid;
			} else {
				item.size_uuid = noSizeResult[0].uuid;
			}
		} else {
			const sizePromise = db
				.select({
					uuid: size.uuid,
				})
				.from(size)
				.where(eq(size.name, item.size_uuid));

			const sizeResult = await sizePromise;

			if (sizeResult.length === 0 && item.size_uuid) {
				const sizeInsertPromise = db
					.insert(size)
					.values({
						uuid: nanoid(15),
						name: item.size_uuid,
						created_by: item.created_by,
						created_at: item.created_at,
						updated_at: item.updated_at,
						remarks: item.remarks,
					})
					.returning({ insertedUuid: size.uuid });
				const sizeInsertResult = await sizeInsertPromise;
				item.size_uuid = sizeInsertResult[0].insertedUuid;
			} else if (sizeResult.length > 0) {
				item.size_uuid = sizeResult[0].uuid;
			}
		}

		// check if material exists with these parameters article_uuid, category_uuid, name_uuid, color_uuid, unit_uuid, size_uuid,
		const materialPromise = db
			.select({
				uuid: material.uuid,
			})
			.from(material)
			.where(
				and(
					eq(material.article_uuid, item.article_uuid),
					eq(material.category_uuid, item.category_uuid),
					eq(material.name_uuid, item.name_uuid),
					eq(material.color_uuid, item.color_uuid),
					eq(material.unit_uuid, item.unit_uuid),
					eq(material.size_uuid, item.size_uuid)
				)
			);

		const materialResult = await materialPromise;

		let material_uuid;

		if (materialResult.length === 0) {
			// Generate a unique UUID for this specific material
			const materialInsertPromise = db
				.insert(material)
				.values({
					uuid: new_material_uuid,
					article_uuid: item.article_uuid,
					category_uuid: item.category_uuid,
					name_uuid: item.name_uuid,
					color_uuid: item.color_uuid,
					size_uuid: item.size_uuid,
					unit_uuid: item.unit_uuid,
					created_by: item.created_by,
					created_at: item.created_at,
					updated_at: item.updated_at,
					remarks: item.remarks,
				})
				.returning({ insertedUuid: material.uuid });

			try {
				const materialInsertResult = await materialInsertPromise;
				material_uuid = materialInsertResult[0].insertedUuid;
			} catch (error) {
				// If there's a duplicate key error, query for the existing material
				if (error.code === '23505') {
					// PostgreSQL unique constraint violation
					const existingMaterialResult = await materialPromise;
					if (existingMaterialResult.length > 0) {
						material_uuid = existingMaterialResult[0].uuid;
					} else {
						throw error; // Re-throw if it's not the expected scenario
					}
				} else {
					throw error; // Re-throw for other errors
				}
			}
		} else {
			material_uuid = materialResult[0].uuid;
		}

		// Create the processed item for receive_entry
		const processedItem = {
			uuid: item.uuid,
			receive_uuid: item.receive_uuid,
			material_uuid: material_uuid,
			quantity: item.quantity,
			price: item.price,
			created_by: item.created_by,
			created_at: item.created_at,
			updated_at: item.updated_at,
			remarks: item.remarks,
			index: item.index,
		};

		processedItems.push(processedItem);
	}

	const receive_entryPromise = db
		.insert(receive_entry)
		.values(processedItems)
		.returning({ insertedUuid: receive_entry.uuid });

	try {
		const data = await receive_entryPromise;

		// const materialPromise = db
		// 	.select({
		// 		name: material_name.name,
		// 	})
		// 	.from(material_name)
		// 	.leftJoin(material, eq(material_name.uuid, material.name_uuid))
		// 	.leftJoin(
		// 		receive_entry,
		// 		eq(material.uuid, receive_entry.material_uuid)
		// 	)
		// 	.where(eq(receive_entry.uuid, data[0].insertedUuid));

		// const materialData = await materialPromise;

		const toast = {
			status: 201,
			type: 'insert',
			message: `${data.length} inserted`,
		};
		return await res.status(201).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	// console.log('req.body', req.body);
	let new_material_uuid = nanoid(15);
	// console.log('new_material_uuid', new_material_uuid);
	let {
		quantity,
		created_by,
		created_at,
		updated_at,
		remarks,
		article_uuid,
		category_uuid,
		name_uuid,
		color_uuid,
		unit_uuid,
		size_uuid,
		index,
	} = req.body;

	// check if article_uuid exists if not then insert into article table
	const articlePromise = db
		.select({
			uuid: publicSchema.article.uuid,
		})
		.from(publicSchema.article)
		.where(eq(publicSchema.article.name, article_uuid));

	const articleResult = await articlePromise;

	if (articleResult.length === 0 && article_uuid) {
		const articleInsertPromise = db
			.insert(publicSchema.article)
			.values({
				uuid: nanoid(15),
				name: article_uuid,
				buyer_uuid: null,
				created_by,
				created_at,
				updated_at,
			})
			.returning({ insertedUuid: publicSchema.article.uuid });

		const articleInsertResult = await articleInsertPromise;
		article_uuid = articleInsertResult[0].insertedUuid;
	} else if (articleResult.length > 0) {
		article_uuid = articleResult[0].uuid;
	}

	// check if category_uuid exists if not then insert into category table
	const categoryPromise = db
		.select({
			uuid: publicSchema.category.uuid,
		})
		.from(publicSchema.category)
		.where(eq(publicSchema.category.name, category_uuid));

	const categoryResult = await categoryPromise;

	if (categoryResult.length === 0 && category_uuid) {
		const categoryInsertPromise = db
			.insert(publicSchema.category)
			.values({
				uuid: nanoid(15),
				name: category_uuid,
				created_by,
				created_at,
				updated_at,
			})
			.returning({ insertedUuid: publicSchema.category.uuid });
		const categoryInsertResult = await categoryInsertPromise;
		category_uuid = categoryInsertResult[0].insertedUuid;
	} else if (categoryResult.length > 0) {
		category_uuid = categoryResult[0].uuid;
	}

	// check if name_uuid exists if not then insert into material_name table
	const namePromise = db
		.select({
			uuid: material_name.uuid,
		})
		.from(material_name)
		.where(eq(material_name.name, name_uuid));

	const nameResult = await namePromise;

	if (nameResult.length === 0 && name_uuid) {
		const nameInsertPromise = db
			.insert(material_name)
			.values({
				uuid: nanoid(15),
				name: name_uuid,
				created_by,
				created_at,
				updated_at,
				remarks,
			})
			.returning({ insertedUuid: material_name.uuid });
		const nameInsertResult = await nameInsertPromise;
		name_uuid = nameInsertResult[0].insertedUuid;
	} else if (nameResult.length > 0) {
		name_uuid = nameResult[0].uuid;
	}
	// check if color_uuid exists if not then insert into color table
	const colorPromise = db
		.select({
			uuid: color.uuid,
		})
		.from(color)
		.where(eq(color.name, color_uuid));
	const colorResult = await colorPromise;
	if (colorResult.length === 0 && color_uuid) {
		const colorInsertPromise = db
			.insert(color)
			.values({
				uuid: nanoid(15),
				name: color_uuid,
				created_by,
				created_at,
				updated_at,
				remarks,
			})
			.returning({ insertedUuid: color.uuid });
		const colorInsertResult = await colorInsertPromise;
		color_uuid = colorInsertResult[0].insertedUuid;
	} else if (colorResult.length > 0) {
		color_uuid = colorResult[0].uuid;
	}
	// check if unit_uuid exists if not then insert into unit table
	const unitPromise = db
		.select({
			uuid: unit.uuid,
		})
		.from(unit)
		.where(eq(unit.name, unit_uuid));
	const unitResult = await unitPromise;
	if (unitResult.length === 0 && unit_uuid) {
		const unitInsertPromise = db
			.insert(unit)
			.values({
				uuid: nanoid(15),
				name: unit_uuid,
				created_by,
				created_at,
				updated_at,
				remarks,
			})
			.returning({ insertedUuid: unit.uuid });
		const unitInsertResult = await unitInsertPromise;
		unit_uuid = unitInsertResult[0].insertedUuid;
	} else if (unitResult.length > 0) {
		unit_uuid = unitResult[0].uuid;
	}

	// check if size_uuid exists if not then insert into size table
	const sizePromise = db
		.select({
			uuid: size.uuid,
		})
		.from(size)
		.where(eq(size.name, size_uuid));

	const sizeResult = await sizePromise;

	if (sizeResult.length === 0 && size_uuid) {
		const sizeInsertPromise = db
			.insert(size)
			.values({
				uuid: nanoid(15),
				name: size_uuid,
				created_by,
				created_at,
				updated_at,
				remarks,
			})
			.returning({ insertedUuid: size.uuid });
		const sizeInsertResult = await sizeInsertPromise;
		size_uuid = sizeInsertResult[0].insertedUuid;
	} else if (sizeResult.length > 0) {
		size_uuid = sizeResult[0].uuid;
	}

	// check if material exists with these parameters article_uuid, category_uuid, name_uuid, color_uuid, unit_uuid, size_uuid,
	const materialPromise = db
		.select({
			uuid: material.uuid,
		})
		.from(material)
		.where(
			and(
				eq(material.article_uuid, article_uuid),
				eq(material.category_uuid, category_uuid),
				eq(material.name_uuid, name_uuid),
				eq(material.color_uuid, color_uuid),
				eq(material.unit_uuid, unit_uuid),
				eq(material.size_uuid, size_uuid)
			)
		);

	const materialResult = await materialPromise;

	let material_uuid;

	// console.log('materialResult', materialResult);
	// console.log('materialResult.length', materialResult.length);

	if (materialResult.length === 0) {
		const materialInsertPromise = db
			.insert(material)
			.values({
				uuid: new_material_uuid,
				article_uuid,
				category_uuid,
				name_uuid,
				color_uuid,
				size_uuid,
				unit_uuid,
				created_by,
				created_at,
				updated_at,
				remarks,
			})
			.returning({ insertedUuid: material.uuid });

		const materialInsertResult = await materialInsertPromise;
		material_uuid = materialInsertResult[0].insertedUuid;
	} else {
		material_uuid = materialResult[0].uuid;
	}

	const receive_entry_values = {
		receive_uuid: req.body.receive_uuid,
		material_uuid: material_uuid,
		quantity,
		price: req.body.price,
		created_by,
		created_at,
		updated_at,
		remarks,
		index,
	};

	// console.log('receive_entry_values', receive_entry_values);

	const receive_entryPromise = db
		.update(receive_entry)
		.set(receive_entry_values)
		.where(eq(receive_entry.uuid, req.params.uuid))
		.returning({ updatedUuid: receive_entry.uuid });

	try {
		const data = await receive_entryPromise;

		const materialPromise = db
			.select({
				name: material_name.name,
			})
			.from(material_name)
			.leftJoin(material, eq(material_name.uuid, material.name_uuid))
			.leftJoin(
				receive_entry,
				eq(material.uuid, receive_entry.material_uuid)
			)
			.where(eq(receive_entry.uuid, data[0].updatedUuid));

		const materialData = await materialPromise;

		if (data && data.length > 0) {
			const toast = {
				status: 200,
				type: 'update',
				message: `${materialData[0].name} updated`,
			};
			return await res.status(200).json({ toast, data });
		} else {
			const toast = {
				status: 404,
				type: 'update',
				message: 'No entry found to update',
			};
			return await res.status(404).json({ toast });
		}
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function updateForReceiveEntryLog(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	// console.log('req.body', req.body);
	let new_material_uuid = nanoid(15);
	// console.log('new_material_uuid', new_material_uuid);
	let {
		quantity,
		created_by,
		created_at,
		updated_at,
		remarks,
		article_uuid,
		category_uuid,
		name_uuid,
		color_uuid,
		unit_uuid,
		size_uuid,
		index,
	} = req.body;

	// check if material exists with these parameters article_uuid, category_uuid, name_uuid, color_uuid, unit_uuid, size_uuid,
	const materialPromise = db
		.select({
			uuid: material.uuid,
		})
		.from(material)
		.where(
			and(
				eq(material.article_uuid, article_uuid),
				eq(material.category_uuid, category_uuid),
				eq(material.name_uuid, name_uuid),
				eq(material.color_uuid, color_uuid),
				eq(material.unit_uuid, unit_uuid),
				eq(material.size_uuid, size_uuid)
			)
		);

	const materialResult = await materialPromise;

	let material_uuid;

	// console.log('materialResult', materialResult);
	// console.log('materialResult.length', materialResult.length);

	if (materialResult.length === 0) {
		const materialInsertPromise = db
			.insert(material)
			.values({
				uuid: new_material_uuid,
				article_uuid,
				category_uuid,
				name_uuid,
				color_uuid,
				size_uuid,
				unit_uuid,
				created_by,
				created_at,
				updated_at,
				remarks,
			})
			.returning({ insertedUuid: material.uuid });

		const materialInsertResult = await materialInsertPromise;
		material_uuid = materialInsertResult[0].insertedUuid;
	} else {
		material_uuid = materialResult[0].uuid;
	}

	const receive_entry_values = {
		receive_uuid: req.body.receive_uuid,
		material_uuid: material_uuid,
		quantity,
		price: req.body.price,
		created_by,
		created_at,
		updated_at,
		remarks,
		index,
	};

	// console.log('receive_entry_values', receive_entry_values);

	const receive_entryPromise = db
		.update(receive_entry)
		.set(receive_entry_values)
		.where(eq(receive_entry.uuid, req.params.uuid))
		.returning({ updatedUuid: receive_entry.uuid });

	try {
		const data = await receive_entryPromise;

		const materialPromise = db
			.select({
				name: material_name.name,
			})
			.from(material_name)
			.leftJoin(material, eq(material_name.uuid, material.name_uuid))
			.leftJoin(
				receive_entry,
				eq(material.uuid, receive_entry.material_uuid)
			)
			.where(eq(receive_entry.uuid, data[0].updatedUuid));

		const materialData = await materialPromise;

		if (data && data.length > 0) {
			const toast = {
				status: 200,
				type: 'update',
				message: `${materialData[0].name} updated`,
			};
			return await res.status(200).json({ toast, data });
		} else {
			const toast = {
				status: 404,
				type: 'update',
				message: 'No entry found to update',
			};
			return await res.status(404).json({ toast });
		}
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const receive_entryPromise = db
		.delete(receive_entry)
		.where(eq(receive_entry.uuid, req.params.uuid))
		.returning({
			deletedUuid: receive_entry.uuid,
			material_uuid: receive_entry.material_uuid,
		});

	try {
		const data = await receive_entryPromise;
		const materialPromise = db
			.select({
				name: material_name.name,
			})
			.from(material_name)
			.leftJoin(material, eq(material_name.uuid, material.name_uuid))
			.where(eq(material.uuid, data[0].material_uuid));

		const materialData = await materialPromise;

		const toast = {
			status: 200,
			type: 'delete',
			message: `${materialData[0].name} deleted`,
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function selectAll(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const resultPromise = db
		.select({
			uuid: receive_entry.uuid,
			receive_uuid: receive_entry.receive_uuid,
			receive_id: sql`concat('R', to_char(receive.created_at, 'YY'), '-', LPAD(receive.id::text, 4, '0'))`,
			vendor_uuid: receive.vendor_uuid,
			vendor_name: vendor.name,
			material_uuid: receive_entry.material_uuid,
			article_uuid: material.article_uuid,
			article_name: publicSchema.article.name,
			buyer_uuid: publicSchema.article.buyer_uuid,
			buyer_name: publicSchema.buyer.name,
			category_uuid: material.category_uuid,
			category_name: publicSchema.category.name,
			name_uuid: material.name_uuid,
			material_name: material_name.name,
			color_uuid: material.color_uuid,
			color_name: color.name,
			unit_uuid: material.unit_uuid,
			unit_name: unit.name,
			size_uuid: material.size_uuid,
			size_name: size.name,
			quantity: decimalToNumber(receive_entry.quantity),
			price: decimalToNumber(receive_entry.price),
			convention_rate: decimalToNumber(receive.convention_rate),
			created_by: receive_entry.created_by,
			created_by_name: hrSchema.users.name,
			created_at: receive_entry.created_at,
			updated_at: receive_entry.updated_at,
			remarks: receive_entry.remarks,
			index: receive_entry.index,
		})
		.from(receive_entry)
		.leftJoin(receive, eq(receive_entry.receive_uuid, receive.uuid))
		.leftJoin(material, eq(receive_entry.material_uuid, material.uuid))
		.leftJoin(
			hrSchema.users,
			eq(receive_entry.created_by, hrSchema.users.uuid)
		)
		.leftJoin(vendor, eq(receive.vendor_uuid, vendor.uuid))
		.leftJoin(material_name, eq(material.name_uuid, material_name.uuid))
		.leftJoin(color, eq(material.color_uuid, color.uuid))
		.leftJoin(unit, eq(material.unit_uuid, unit.uuid))
		.leftJoin(size, eq(material.size_uuid, size.uuid))
		.leftJoin(
			publicSchema.article,
			eq(material.article_uuid, publicSchema.article.uuid)
		)
		.leftJoin(
			publicSchema.category,
			eq(material.category_uuid, publicSchema.category.uuid)
		)
		.leftJoin(
			publicSchema.buyer,
			eq(publicSchema.article.buyer_uuid, publicSchema.buyer.uuid)
		)

		.orderBy(desc(receive_entry.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'receive_entry list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const resultPromise = db
		.select({
			uuid: receive_entry.uuid,
			receive_uuid: receive_entry.receive_uuid,
			receive_id: sql`concat('R', to_char(receive.created_at, 'YY'), '-', LPAD(receive.id::text, 4, '0'))`,
			vendor_uuid: receive.vendor_uuid,
			vendor_name: vendor.name,
			material_uuid: receive_entry.material_uuid,
			article_uuid: material.article_uuid,
			article_name: publicSchema.article.name,
			buyer_uuid: publicSchema.article.buyer_uuid,
			buyer_name: publicSchema.buyer.name,
			category_uuid: material.category_uuid,
			category_name: publicSchema.category.name,
			name_uuid: material.name_uuid,
			material_name: material_name.name,
			color_uuid: material.color_uuid,
			color_name: color.name,
			unit_uuid: material.unit_uuid,
			unit_name: unit.name,
			size_uuid: material.size_uuid,
			size_name: size.name,
			quantity: decimalToNumber(receive_entry.quantity),
			price: decimalToNumber(receive_entry.price),
			convention_rate: decimalToNumber(receive.convention_rate),
			created_by: receive_entry.created_by,
			created_bby_name: hrSchema.users.name,
			created_at: receive_entry.created_at,
			updated_at: receive_entry.updated_at,
			remarks: receive_entry.remarks,
			index: receive_entry.index,
		})
		.from(receive_entry)
		.leftJoin(receive, eq(receive_entry.receive_uuid, receive.uuid))
		.leftJoin(vendor, eq(receive.vendor_uuid, vendor.uuid))
		.leftJoin(material, eq(receive_entry.material_uuid, material.uuid))
		.leftJoin(material_name, eq(material.name_uuid, material_name.uuid))
		.leftJoin(color, eq(material.color_uuid, color.uuid))
		.leftJoin(unit, eq(material.unit_uuid, unit.uuid))
		.leftJoin(size, eq(material.size_uuid, size.uuid))
		.leftJoin(
			publicSchema.article,
			eq(material.article_uuid, publicSchema.article.uuid)
		)
		.leftJoin(
			publicSchema.category,
			eq(material.category_uuid, publicSchema.category.uuid)
		)
		.leftJoin(
			publicSchema.buyer,
			eq(publicSchema.article.buyer_uuid, publicSchema.buyer.uuid)
		)
		.leftJoin(
			hrSchema.users,
			eq(receive_entry.created_by, hrSchema.users.uuid)
		)
		.where(eq(receive_entry.uuid, req.params.uuid));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select one',
			message: 'receive_entry details',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function selectByReceiveUuid(req, res, next) {
	const receive_entryPromise = db
		.select({
			uuid: receive_entry.uuid,
			receive_uuid: receive_entry.receive_uuid,
			receive_id: sql`concat('R', to_char(receive.created_at, 'YY'), '-', LPAD(receive.id::text, 4, '0'))`,
			vendor_uuid: receive.vendor_uuid,
			vendor_name: vendor.name,
			material_uuid: material_name.name,
			buyer_uuid: publicSchema.buyer.name,
			buyer_name: publicSchema.buyer.uuid,
			article_uuid: sql`CONCAT(public.article.name, '-', public.buyer.name)`,
			category_uuid: publicSchema.category.name,
			name_uuid: material_name.name,
			color_uuid: color.name,
			unit_uuid: unit.name,
			size_uuid: size.name,
			article_name: publicSchema.article.uuid,
			category_name: publicSchema.category.uuid,
			material_name: material.uuid,
			color_name: color.uuid,
			unit_name: unit.uuid,
			size_name: size.uuid,
			quantity: decimalToNumber(receive_entry.quantity),
			price: decimalToNumber(receive_entry.price),
			convention_rate: decimalToNumber(receive.convention_rate),
			created_by: receive_entry.created_by,
			created_by_name: hrSchema.users.name,
			created_at: receive_entry.created_at,
			updated_at: receive_entry.updated_at,
			remarks: receive_entry.remarks,
			index: receive_entry.index,
		})
		.from(receive_entry)
		.leftJoin(receive, eq(receive_entry.receive_uuid, receive.uuid))
		.leftJoin(vendor, eq(receive.vendor_uuid, vendor.uuid))
		.leftJoin(material, eq(receive_entry.material_uuid, material.uuid))
		.leftJoin(material_name, eq(material.name_uuid, material_name.uuid))
		.leftJoin(color, eq(material.color_uuid, color.uuid))
		.leftJoin(unit, eq(material.unit_uuid, unit.uuid))
		.leftJoin(size, eq(material.size_uuid, size.uuid))
		.leftJoin(
			publicSchema.article,
			eq(material.article_uuid, publicSchema.article.uuid)
		)
		.leftJoin(
			publicSchema.category,
			eq(material.category_uuid, publicSchema.category.uuid)
		)
		.leftJoin(
			publicSchema.buyer,
			eq(publicSchema.article.buyer_uuid, publicSchema.buyer.uuid)
		)
		.leftJoin(
			hrSchema.users,
			eq(receive_entry.created_by, hrSchema.users.uuid)
		)
		.where(eq(receive_entry.receive_uuid, req.params.receive_uuid))
		.orderBy(asc(receive_entry.index));

	try {
		const data = await receive_entryPromise;

		const toast = {
			status: 200,
			type: 'select all',
			message: 'receive_entry list',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
