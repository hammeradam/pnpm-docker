import { inspectRoutes } from 'hono/dev';
import { OpenAPIHono } from '.';
import { apiReference } from '@scalar/hono-api-reference';
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import { red } from '@repo/logger';

export * from '@hono/node-server';
export * from 'hono';
export * from '@hono/zod-openapi';

export const createServer = ({
    routes,
    port,
    log = true,
    inspect = false,
    apiTitle = 'My API',
    apiVersion = '1.0.0',
}: {
    routes: {
        path: string;
        handler: OpenAPIHono;
    }[];
    port: number;
    log?: boolean;
    inspect?: boolean;
    apiTitle?: string;
    apiVersion?: string;
}) => {
    const app = new OpenAPIHono();

    if (log) {
        app.use('*', logger());
    }

    routes.forEach((route) => app.route(route.path, route.handler));

    red(`Server is running on port ${port}`);

    if (inspect) {
        console.log(inspectRoutes(app));
    }

    app.doc('/doc', {
        openapi: '3.0.0',
        info: {
            version: apiVersion,
            title: apiTitle,
        },
    });

    app.get(
        '/reference',
        apiReference({
            spec: {
                url: '/doc',
            },
            theme: 'purple',
        }),
    );

    serve({
        fetch: app.fetch,
        port,
    });

    return app;
};
