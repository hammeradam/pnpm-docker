import { mysqlTable, text, int } from 'drizzle-orm/mysql-core';
import { timestamps } from '.';
import { categoryTable } from './categories';

export const productTable = mysqlTable('products', {
    id: int('id').primaryKey().autoincrement(),
    name: text('name').notNull(),
    categoryId: int('newsletter_id')
        .references(() => categoryTable.id)
        .notNull(),
    ...timestamps,
});
