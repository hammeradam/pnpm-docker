ALTER TABLE `newsletters` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `newsletters` MODIFY COLUMN `updated_at` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `subscriptions` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `subscriptions` MODIFY COLUMN `updated_at` datetime NOT NULL;