import { createClient } from 'redis';
import { config } from './config.server.ts';

const client = await createClient({ url: config.REDIS_URL })
	.on('error', (err) => {
		console.log('Redis Client Error', err);
	})
	.connect();

export default client;
