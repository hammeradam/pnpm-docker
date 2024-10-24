CREATE TABLE `newsletters` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`newsletter_id` int NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `newsletters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `movies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`release_year` int NOT NULL,
	CONSTRAINT `movies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` text NOT NULL,
	`newsletter_id` int NOT NULL,
	`verify_token` varchar(10) NOT NULL,
	`verified_at` datetime,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `newsletters` ADD CONSTRAINT `newsletters_newsletter_id_newsletters_id_fk` FOREIGN KEY (`newsletter_id`) REFERENCES `newsletters`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_newsletter_id_newsletters_id_fk` FOREIGN KEY (`newsletter_id`) REFERENCES `newsletters`(`id`) ON DELETE no action ON UPDATE no action;