import { mysqlTable, text, int } from 'drizzle-orm/mysql-core';

export const movieModel = mysqlTable('movies', {
    id: int('id').primaryKey().autoincrement(),
    title: text('name').notNull(),
    releaseYear: int('release_year').notNull(),
});
