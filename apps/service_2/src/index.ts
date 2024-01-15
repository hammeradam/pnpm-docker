import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { red } from '@repo/logger';
import { logger } from 'hono/logger';

const api = new Hono();
api.use('*', logger());

api.get('/', (c) => {
  return c.text('Hello Hono 2 mivaaasdasdasdd!');
});

api.get('/test', (c) => {
  return c.text('Hello Hono 2 test!');
});

const port = 3001;
red(`Server is running on port ${port}`);

const app = new Hono();
app.route(process.env.PATH_PREFIX!, api);

serve({
  fetch: app.fetch,
  port,
});
