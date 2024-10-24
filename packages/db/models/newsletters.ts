import { relations, sql } from 'drizzle-orm';
import {
    mysqlTable,
    text,
    int,
    datetime,
    varchar,
} from 'drizzle-orm/mysql-core';
import { timestamps } from '.';

export const newsletterTable = mysqlTable('newsletters', {
    id: int('id').primaryKey().autoincrement(),
    name: text('name').notNull(),

    ...timestamps,
});

export const subscribtionTable = mysqlTable('subscriptions', {
    id: int('id').primaryKey().autoincrement(),
    email: text('email').notNull(),
    newsletterId: int('newsletter_id')
        .references(() => newsletterTable.id)
        .notNull(),
    verifyToken: varchar('verify_token', {
        length: 10,
    }).notNull(),
    verifiedAt: datetime('verified_at'),

    ...timestamps,
});

export const usersRelations = relations(newsletterTable, ({ many }) => ({
    subscribers: many(subscribtionTable),
}));
