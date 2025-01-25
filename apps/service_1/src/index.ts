console.log('asdassdd');
import { env } from '@/env';
import { createServer } from '@repo/base_service';

import { moviesApp } from './movies';
import { newsletterApp } from './newsletter';
// import { getId } from '@repo/id';

// console.log(getId(5), getId());

createServer({
    port: env.PORT,
    routes: [
        {
            path: '/movies',
            handler: moviesApp,
        },
        {
            path: '/newsletter',
            handler: newsletterApp,
        },
    ],
});
