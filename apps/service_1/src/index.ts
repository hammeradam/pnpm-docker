import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { red } from '@repo/logger';
import { logger } from 'hono/logger';
import { env } from '@/env';

const app = new Hono();
app.use('*', logger());

app.get('/', (c) => {
    return c.text('Hello Hono 1 mivaaasdasdasdd!');
});

app.get('/test', (c) => {
    return c.text('Hello Hono 1 test!');
});

const port = env.PORT;
red(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
});
