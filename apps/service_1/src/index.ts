import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { red } from '@repo/logger';
import { test } from './test/asd';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono 1!');
});

test();

const port = 3000;
red(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
