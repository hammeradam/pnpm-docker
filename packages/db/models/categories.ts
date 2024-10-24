import { mysqlTable, text, int } from 'drizzle-orm/mysql-core';
import { timestamps } from '.';

export const categoryTable = mysqlTable('categories', {
    id: int('id').primaryKey().autoincrement(),
    name: text('name').notNull(),

    ...timestamps,
});
