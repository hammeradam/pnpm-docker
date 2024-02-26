ALTER TABLE `subscriptions` ADD `verify_token` varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD `verified_at` datetime;