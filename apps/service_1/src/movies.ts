import { movieModel } from '@repo/db/models/movies';
import { eq, createInsertSchema, db } from '@repo/db';
import { OpenAPIHono, createRoute, z } from '@repo/base_service';
import Redis from '@repo/queue';
import { env } from '@/env';

const pub = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
});

const tags = ['movies'];

const idSchema = z.object({
    id: z.string().openapi({
        param: {
            name: 'id',
            in: 'path',
        },
        example: '1',
    }),
});

const movieSchema = createInsertSchema(movieModel);
const insertMovieSchema = movieSchema.omit({
    id: true,
});

const createMovie = createRoute({
    method: 'post',
    path: '/create',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: insertMovieSchema,
                },
            },
        },
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: movieSchema,
                },
            },
            description: 'Create a user',
        },
    },
    tags,
    summary: 'Create a movie',
    description: 'description',
});

const editMovie = createRoute({
    method: 'patch',
    path: '/{id}',
    request: {
        params: idSchema,
        body: {
            content: {
                'application/json': {
                    schema: insertMovieSchema,
                },
            },
        },
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: movieSchema,
                },
            },
            description: 'Edit the user',
        },
    },
    tags,
    summary: 'Edit a movie',
    description: 'description',
});

const getMovie = createRoute({
    method: 'get',
    path: '/{id}',
    request: {
        params: idSchema,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: movieSchema,
                },
            },
            description: 'Retrieve a movie',
        },
    },
    tags,
    summary: 'Retrieve a movie',
    description: 'description',
});

const deleteMovie = createRoute({
    method: 'delete',
    path: '/{id}',
    request: {
        params: idSchema,
    },
    responses: {
        204: {
            content: {
                'application/json': {
                    schema: z.null(),
                },
            },
            description: 'Retrieve the user',
        },
    },
    tags,
    summary: 'Delete a movie',
    description: 'description',
});

const getMovies = createRoute({
    method: 'get',
    path: '/',
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.array(movieSchema),
                },
            },
            description: 'Retrieve the user',
        },
    },
    tags,
    summary: 'Retrieve all movies',
    description: 'description',
});

export const moviesApp = new OpenAPIHono()
    .openapi(createMovie, async (c) => {
        const body = c.req.valid('json');

        const result = await db.insert(movieModel).values(body);
        const ret = await db
            .select()
            .from(movieModel)
            .where(eq(movieModel.id, result[0].insertId));

        pub.publish('movie_created', JSON.stringify(ret[0]));

        return c.json(ret[0]!);
    })
    .openapi(getMovie, async (c) => {
        const id = parseInt(c.req.valid('param').id);
        const movie = await db
            .select()
            .from(movieModel)
            .where(eq(movieModel.id, id));

        return c.json(movie[0]!);
    })
    .openapi(getMovies, async (c) => {
        const movie = await db.select().from(movieModel);

        return c.json(movie);
    })
    .openapi(deleteMovie, async (c) => {
        const id = parseInt(c.req.valid('param').id);

        await db.delete(movieModel).where(eq(movieModel.id, id));

        return c.json(null, 204);
    })
    .openapi(editMovie, async (c) => {
        const id = parseInt(c.req.valid('param').id);
        const body = c.req.valid('json');

        await db.update(movieModel).set(body).where(eq(movieModel.id, id));

        const ret = await db
            .select()
            .from(movieModel)
            .where(eq(movieModel.id, id));

        return c.json(ret[0]!);
    });
