/* eslint-disable import/no-unresolved */
import { createClient } from 'redis';
import { building } from '$app/environment';
import { config } from './config.server.ts';

const client = createClient({ url: config.REDIS_URL });

client.on('error', (err) => {
	console.log('Redis Client Error', err);
});

if (!building) {
	await client.connect();
}

export default client;
