CREATE TABLE `newsletters` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` int NOT NULL,
	`updated_at` int NOT NULL,
	CONSTRAINT `newsletters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` text NOT NULL,
	`newsletter_id` int NOT NULL,
	`created_at` int NOT NULL,
	`updated_at` int NOT NULL,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_newsletter_id_newsletters_id_fk` FOREIGN KEY (`newsletter_id`) REFERENCES `newsletters`(`id`) ON DELETE no action ON UPDATE no action;