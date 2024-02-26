export * from 'drizzle-orm';
export * from 'drizzle-zod';

import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';

export const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

export const db = drizzle(connection);

console.log('connect');
