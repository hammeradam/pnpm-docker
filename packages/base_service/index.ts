import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';

export const createServer = (port: number) => {
  console.log(process.env.PATH_PREFIX);
};
