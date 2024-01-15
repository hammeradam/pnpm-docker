import { z } from 'zod';
import { createEnv } from '@repo/env';

export const env = createEnv(
    z.object({
        PORT: z.coerce.number(),
        PATH_PREFIX: z.string(),
    }),
);
