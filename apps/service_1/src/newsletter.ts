import {
    newsletterTable,
    subscribtionTable,
} from '@repo/db/models/newsletters';
import Redis from '@repo/queue';
import { env } from '@/env';
import { OpenAPIHono, createRoute, z } from '@repo/base_service';
import { and, createInsertSchema, db, eq } from '@repo/db';
import { getId } from '../../../packages/id';

// const asd = await db
//     .select({
//         newsletterName: newsletterTable.name,
//         subscriber: {
//             email: subscribtionTable.email,
//         },
//     })
//     .from(newsletterTable)
//     .leftJoin(
//         subscribtionTable,
//         eq(newsletterTable.id, subscribtionTable.newsletterId),
//     );

// console.log(asd);

const pub = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
});

const subscribtionSchema = createInsertSchema(subscribtionTable);

const subscribeSchema = createInsertSchema(subscribtionTable).pick({
    email: true,
});

const tags = ['newsletter'];

const newsletterIdSchema = z.object({
    newsletterId: z.string().openapi({
        param: {
            name: 'newsletterId',
            in: 'path',
        },
        example: '1',
    }),
});

const subscribe = createRoute({
    path: '/{newsletterId}/subscribe',
    method: 'post',
    request: {
        params: newsletterIdSchema,
        body: {
            content: {
                'application/json': {
                    schema: subscribeSchema,
                },
            },
        },
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: subscribtionSchema.omit({
                        createdAt: true,
                        updatedAt: true,
                    }),
                },
            },
            description: 'Create a user',
        },
        400: {
            content: {
                'application/json': {
                    schema: {
                        error: z.string(),
                    },
                },
            },
            description: 'newsletter not found',
        },
    },
    tags,
    summary: 'Subscribe to a newsletter',
    description: 'description',
});

const verify = createRoute({
    path: '/{newsletterId}/verify/{token}',
    method: 'get',
    request: {
        params: newsletterIdSchema.extend({
            token: z.string().openapi({
                param: {
                    name: 'token',
                    in: 'path',
                },
                example: '12345asdfg',
            }),
        }),
    },
    responses: {
        201: {
            description: 'verified',
        },
        400: {
            content: {
                'application/json': {
                    schema: {
                        error: z.string(),
                    },
                },
            },
            description: 'newsletter not found',
        },
    },
    tags,
    summary: 'Subscribe to a newsletter',
    description: 'description',
});

export const newsletterApp = new OpenAPIHono()
    .openapi(subscribe, async (c) => {
        const { email } = c.req.valid('json');

        const newsletterId = parseInt(c.req.valid('param').newsletterId);

        if (
            Number.isNaN(newsletterId) ||
            !(
                await db
                    .select()
                    .from(newsletterTable)
                    .where(eq(newsletterTable.id, newsletterId))
            ).length
        ) {
            return c.json(
                {
                    error: 'newsletter not found',
                },
                400,
            );
        }

        const result = await db.insert(subscribtionTable).values({
            email,
            newsletterId,
            verifyToken: getId(),
        });

        const ret = await db
            .select()
            .from(subscribtionTable)
            .where(eq(subscribtionTable.id, result[0].insertId));

        pub.publish('subscribed', JSON.stringify(ret[0]!));

        return c.json(ret[0]!);
    })
    .openapi(verify, async (c) => {
        const newsletterId = parseInt(c.req.valid('param').newsletterId);
        const token = c.req.valid('param').token;

        if (Number.isNaN(newsletterId) || !token) {
            return c.json(
                {
                    error: 'bad request',
                },
                400,
            );
        }

        const [subscribtion] = await db
            .select()
            .from(subscribtionTable)
            .where(
                and(
                    eq(subscribtionTable.newsletterId, newsletterId),
                    eq(subscribtionTable.verifyToken, token),
                ),
            )
            .limit(1);

        if (!subscribtion) {
            return c.json(
                {
                    error: 'bad request',
                },
                400,
            );
        }

        await db
            .update(subscribtionTable)
            .set({
                verifiedAt: new Date(),
            })
            .where(eq(subscribtionTable.id, subscribtion.id));

        return c.json({}, 201);
    });
