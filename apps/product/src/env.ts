import { z } from '@repo/base_service';
import { createEnv } from '@repo/env';

export const env = createEnv(
    z.object({
        PORT: z.coerce.number(),

        DB_HOST: z.string().min(1),
        DB_USER: z.string().min(1),
        DB_PASS: z.string(),
        DB_NAME: z.string().min(1),

        REDIS_HOST: z.string().min(1),
        REDIS_PORT: z.coerce.number(),
    }),
);
