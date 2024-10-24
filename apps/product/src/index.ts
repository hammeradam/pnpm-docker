import { env } from '@/env';
import { createServer } from '@repo/base_service';
import { categoriesApp } from './category';

createServer({
    port: env.PORT,
    routes: [
        {
            path: '/category',
            handler: categoriesApp,
        },
    ],
});
