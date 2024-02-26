import { z } from 'zod';
import { createEnv } from '@repo/env';

export const env = createEnv(
    z.object({
        PORT: z.coerce.number(),

        REDIS_HOST: z.string().min(1),
        REDIS_PORT: z.coerce.number(),
    }),
);
