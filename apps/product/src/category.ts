import { eq, createInsertSchema, db, createSelectSchema } from '@repo/db';
import { OpenAPIHono, createRoute, z } from '@repo/base_service';
import { categoryTable } from '@repo/db/models/categories';

const tags = ['category'];

const idSchema = z.object({
    id: z.string().openapi({
        param: {
            name: 'id',
            in: 'path',
        },
        example: '1',
    }),
});

// const categorySchema = createInsertSchema(categoryTable);
// const insertCategorySchema = categorySchema.omit({
//     id: true,
// });

const categorySchema = z
    .object({
        id: z.number().openapi({
            example: 123,
        }),
        name: z.string().openapi({
            example: 'John Doe',
        }),
        createdAt: z.string().openapi({
            example: '2021-01-01T00:00:00.000Z',
        }),
        updatedAt: z.string().openapi({
            example: '2021-01-01T00:00:00.000Z',
        }),
    })
    .openapi('User');

const insertCategorySchema = categorySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

const createCategory = createRoute({
    method: 'post',
    path: '/create',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: insertCategorySchema,
                },
            },
        },
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: categorySchema,
                },
            },
            description: 'Create a category',
        },
    },
    tags,
    summary: 'Create a category',
    description: 'description',
});

// const editCategory = createRoute({
//     method: 'patch',
//     path: '/{id}',
//     request: {
//         params: idSchema,
//         body: {
//             content: {
//                 'application/json': {
//                     schema: insertCategorySchema,
//                 },
//             },
//         },
//     },
//     responses: {
//         200: {
//             content: {
//                 'application/json': {
//                     schema: categorySchema,
//                 },
//             },
//             description: 'Edit the categ',
//         },
//     },
//     tags,
//     summary: 'Edit a category',
//     description: 'description',
// });

// const getCategory = createRoute({
//     method: 'get',
//     path: '/{id}',
//     request: {
//         params: idSchema,
//     },
//     responses: {
//         200: {
//             content: {
//                 'application/json': {
//                     schema: categorySchema,
//                 },
//             },
//             description: 'Retrieve a category',
//         },
//     },
//     tags,
//     summary: 'Retrieve a category',
//     description: 'description',
// });

// const deleteCategory = createRoute({
//     method: 'delete',
//     path: '/{id}',
//     request: {
//         params: idSchema,
//     },
//     responses: {
//         204: {
//             content: {
//                 'application/json': {
//                     schema: z.null(),
//                 },
//             },
//             description: 'Retrieve the categ',
//         },
//     },
//     tags,
//     summary: 'Delete a category',
//     description: 'description',
// });

// const getCategorys = createRoute({
//     method: 'get',
//     path: '/',
//     responses: {
//         200: {
//             content: {
//                 'application/json': {
//                     schema: z.array(categorySchema),
//                 },
//             },
//             description: 'Retrieve the categ',
//         },
//     },
//     tags,
//     summary: 'Retrieve all categories',
//     description: 'description',
// });

export const categoriesApp = new OpenAPIHono().openapi(
    createCategory,
    async (c) => {
        const body = c.req.valid('json');

        const result = await db.insert(categoryTable).values(body);
        const ret = await db
            .select()
            .from(categoryTable)
            .where(eq(categoryTable.id, result[0].insertId));

        return c.json(ret[0]!);
    },
);
// .openapi(getCategory, async (c) => {
//     const id = parseInt(c.req.valid('param').id);
//     const category = await db
//         .select()
//         .from(categoryTable)
//         .where(eq(categoryTable.id, id));

//     return c.json(category[0]!);
// })
// .openapi(getCategorys, async (c) => {
//     const category = await db.select().from(categoryTable);

//     return c.json(category);
// })
// .openapi(deleteCategory, async (c) => {
//     const id = parseInt(c.req.valid('param').id);

//     await db.delete(categoryTable).where(eq(categoryTable.id, id));

//     return c.json(null, 204);
// })
// .openapi(editCategory, async (c) => {
//     const id = parseInt(c.req.valid('param').id);
//     const body = c.req.valid('json');

//     await db
//         .update(categoryTable)
//         .set(body)
//         .where(eq(categoryTable.id, id));

//     const ret = await db
//         .select()
//         .from(categoryTable)
//         .where(eq(categoryTable.id, id));

//     return c.json(ret[0]!);
// });
