import { Router } from 'express';

import * as otherOperations from './query/query.js';

const otherRouter = Router();

// WARNING: public
// buyer , category, article
otherRouter.get('/buyer/value/label', otherOperations.selectBuyer);
otherRouter.get('/category/value/label', otherOperations.selectCategory);
otherRouter.get('/article/value/label', otherOperations.selectArticle);

// WARNING: hr
// user, department, designation
otherRouter.get('/department/value/label', otherOperations.selectDepartment);
otherRouter.get('/hr/user/value/label', otherOperations.selectHrUser);
otherRouter.get('/designation/value/label', otherOperations.selectDesignation);

// WARNING: store
// material, vendor, receive
otherRouter.get('/material/value/label', otherOperations.selectMaterial);
otherRouter.get(
	'/material-name/value/label',
	otherOperations.selectMaterialName
);
otherRouter.get('/color/value/label', otherOperations.selectColor);
otherRouter.get('/size/value/label', otherOperations.selectSize);
otherRouter.get('/unit/value/label', otherOperations.selectUnit);
otherRouter.get('/vendor/value/label', otherOperations.selectVendor);
// otherRouter.get('/receive/value/label', otherOperations.selectReceive);

// WARNING: commercial
// lc, master-lc
otherRouter.get('/lc/value/label', otherOperations.selectLc);
otherRouter.get('/master-lc/value/label', otherOperations.selectMasterLc);

// NOTE: public
// buyer , category, article swagger route
const pathPublic = {
	'/other/buyer/value/label': {
		get: {
			operationId: 'selectBuyer',
			tags: ['other'],
			summary: 'Select Buyer',
			description: 'Select Buyer',
			responses: {
				200: {
					description: 'Returns a all buyers.',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: {
										type: 'string',
										example: '2ggcphnwHGzEUGy',
									},
									label: {
										type: 'string',
										example: 'buyer 1',
									},
								},
							},
						},
					},
				},
			},
		},
	},
	'/other/category/value/label': {
		get: {
			operationId: 'selectCategory',
			tags: ['other'],
			summary: 'Select Category',
			description: 'Select Category',
			responses: {
				200: {
					description: 'Returns a all categories.',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: {
										type: 'string',
										example: '2ggcphnwHGzEUGy',
									},
									label: {
										type: 'string',
										example: 'category 1',
									},
								},
							},
						},
					},
				},
			},
		},
	},

	'/other/article/value/label': {
		get: {
			operationId: 'selectArticle',
			tags: ['other'],
			summary: 'Select Article',
			description: 'Select Article',
			responses: {
				200: {
					description: 'Returns a all articles.',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: {
										type: 'string',
										example: '2ggcphnwHGzEUGy',
									},
									label: {
										type: 'string',
										example: 'article 1',
									},
								},
							},
						},
					},
				},
			},
		},
	},
};
// hr user, department, designation swagger route

const pathHr = {
	'/other/department/value/label': {
		get: {
			operationId: 'selectDepartment',
			tags: ['other'],
			summary: 'Select Department',
			description: 'Select Department',
			responses: {
				200: {
					description: 'Returns a all departments.',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: {
										type: 'string',
										example: '2ggcphnwHGzEUGy',
									},
									label: {
										type: 'string',
										example: 'department 1',
									},
								},
							},
						},
					},
				},
			},
		},
	},
	'/other/hr/user/value/label': {
		get: {
			operationId: 'selectHrUser',
			tags: ['other'],
			summary: 'Select Hr User',
			description: 'Select Hr User',
			responses: {
				200: {
					description: 'Returns a all hr users.',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: {
										type: 'string',
										example: '2ggcphnwHGzEUGy',
									},
									label: {
										type: 'string',
										example: 'hr user 1',
									},
								},
							},
						},
					},
				},
			},
		},
	},
	'/other/designation/value/label': {
		get: {
			operationId: 'selectDesignation',
			tags: ['other'],
			summary: 'Select Designation',
			description: 'Select Designation',
			responses: {
				200: {
					description: 'Returns a all designations.',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: {
										type: 'string',
										example: '2ggcphnwHGzEUGy',
									},
									label: {
										type: 'string',
										example: 'designation 1',
									},
								},
							},
						},
					},
				},
			},
		},
	},
};

// NOTE: store
// material, material name, color, size, unit, vendor swagger route

const pathStore = {
	'/other/material/value/label': {
		get: {
			operationId: 'selectMaterial',
			tags: ['other'],
			summary: 'Select Material',
			description: 'Select Material',
			responses: {
				200: {
					description: 'Returns a all materials.',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: {
										type: 'string',
										example: '2ggcphnwHGzEUGy',
									},
									label: {
										type: 'string',
										example: 'material 1',
									},
								},
							},
						},
					},
				},
			},
		},
	},
	'/other/material-name/value/label': {
		get: {
			operationId: 'selectMaterialName',
			tags: ['other'],
			summary: 'Select Material Name',
			description: 'Select Material Name',
			responses: {
				200: {
					description: 'Returns a all material names.',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: {
										type: 'string',
										example: '2ggcphnwHGzEUGy',
									},
									label: {
										type: 'string',
										example: 'material name 1',
									},
								},
							},
						},
					},
				},
			},
		},
	},
	'/other/color/value/label': {
		get: {
			operationId: 'selectColorName',
			tags: ['other'],
			summary: 'Select color Name',
			description: 'Select color Name',
			responses: {
				200: {
					description: 'Returns a all color names.',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: {
										type: 'string',
										example: '2ggcphnwHGzEUGy',
									},
									label: {
										type: 'string',
										example: 'color name 1',
									},
								},
							},
						},
					},
				},
			},
		},
	},
	'/other/size/value/label': {
		get: {
			operationId: 'selectSizeName',
			tags: ['other'],
			summary: 'Select size Name',
			description: 'Select size Name',
			responses: {
				200: {
					description: 'Returns a all size names.',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: {
										type: 'string',
										example: '2ggcphnwHGzEUGy',
									},
									label: {
										type: 'string',
										example: 'size name 1',
									},
								},
							},
						},
					},
				},
			},
		},
	},
	'/other/unit/value/label': {
		get: {
			operationId: 'selectUnitName',
			tags: ['other'],
			summary: 'Select unit Name',
			description: 'Select unit Name',
			responses: {
				200: {
					description: 'Returns a all unit names.',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: {
										type: 'string',
										example: '2ggcphnwHGzEUGy',
									},
									label: {
										type: 'string',
										example: 'unit name 1',
									},
								},
							},
						},
					},
				},
			},
		},
	},
	'/other/vendor/value/label': {
		get: {
			operationId: 'selectVendor',
			tags: ['other'],
			summary: 'Select Vendor',
			description: 'Select Vendor',
			responses: {
				200: {
					description: 'Returns a all vendors.',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: {
										type: 'string',
										example: '2ggcphnwHGzEUGy',
									},
									label: {
										type: 'string',
										example: 'vendor 1',
									},
								},
							},
						},
					},
				},
			},
		},
	},
	// '/other/receive/value/label': {
	// 	get: {
	// 		operationId: 'selectReceive',
	// 		tags: ['other'],
	// 		summary: 'Select Receive',
	// 		description: 'Select Receive',
	// 		responses: {
	// 			200: {
	// 				description: 'Returns a all receives.',
	// 				content: {
	// 					'application/json': {
	// 						schema: {
	// 							type: 'object',
	// 							properties: {
	// 								value: {
	// 									type: 'string',
	// 									example: '2ggcphnwHGzEUGy',
	// 								},
	// 								label: {
	// 									type: 'string',
	// 									example: 'receive 1',
	// 								},
	// 							},
	// 						},
	// 					},
	// 				},
	// 			},
	// 		},
	// 	},
	// },
};

// NOTE: commercial
// lc, master-lc swagger route

const pathCommercial = {
	'/other/lc/value/label': {
		get: {
			operationId: 'selectLc',
			tags: ['other'],
			summary: 'Select Lc',
			description: 'Select Lc',
			responses: {
				200: {
					description: 'Returns a all lcs.',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: {
										type: 'string',
										example: '2ggcphnwHGzEUGy',
									},
									label: {
										type: 'string',
										example: 'lc 1',
									},
								},
							},
						},
					},
				},
			},
		},
	},
	'/other/master-lc/value/label': {
		get: {
			operationId: 'selectMasterLc',
			tags: ['other'],
			summary: 'Select MasterLc',
			description: 'Select MasterLc',
			responses: {
				200: {
					description: 'Returns a all master lcs.',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									value: {
										type: 'string',
										example: '2ggcphnwHGzEUGy',
									},
									label: {
										type: 'string',
										example: 'master lc 1',
									},
								},
							},
						},
					},
				},
			},
		},
	},
};

export const pathOther = {
	...pathPublic,
	...pathHr,
	...pathStore,
	...pathCommercial,
};

export const tagOther = [
	{
		name: 'other',
		description: 'Other operations',
	},
];

export { otherRouter };
