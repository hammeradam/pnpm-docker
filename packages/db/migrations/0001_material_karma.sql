CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`newsletter_id` int NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `newsletters` DROP FOREIGN KEY `newsletters_newsletter_id_newsletters_id_fk`;
--> statement-breakpoint
ALTER TABLE `newsletters` DROP COLUMN `newsletter_id`;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_newsletter_id_categories_id_fk` FOREIGN KEY (`newsletter_id`) REFERENCES `categories`(`id`) ON DELETE no action ON UPDATE no action;