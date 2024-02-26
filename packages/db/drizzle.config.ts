import type { Config } from 'drizzle-kit';
export default {
    schema: './models/*.ts',
    out: './migrations',
} satisfies Config;
