import { sql } from 'drizzle-orm';
import { datetime } from 'drizzle-orm/mysql-core';

export const timestamps = {
    createdAt: datetime('created_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime('updated_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
};
