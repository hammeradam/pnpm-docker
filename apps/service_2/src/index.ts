import Redis from '@repo/queue';
import { env } from '@/env';

const sub = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
});

sub.subscribe('movie_created');

sub.on('message', (channel, message) => {
    if (channel === 'movie_created') {
        console.log(JSON.parse(message));
    } else {
        console.log('unknown channel', channel);
    }
});
