import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
process.env.PATH_PREFIX;
export const createServer = (port: number) => {
  console.log(process.env.PATH_PREFIX);
};
