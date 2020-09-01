import { MikroORM } from '@mikro-orm/core';
import microConfig from './mikro-orm.config';
// import { Post } from './entities/Post';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';

// import 'reflect-metadata';

import redis from 'redis'
import session from 'express-session';
import connectRedis from 'connect-redis';
import { __prod__ } from './constants';
import { MyContext } from './types';

const main = async () => {
	//ORM init
	const orm = await MikroORM.init(microConfig);
	await orm.getMigrator().up();

	//web server
	const app = express();

	//缓存
	const RedisStore = connectRedis(session);
	const redisClient = redis.createClient();

	app.use(
		session({
			name: 'qid',
			store: new RedisStore({
				client: redisClient,
				// disableTTL: true, 
				disableTouch: true
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 265 * 10, // 10 years
				httpOnly: true,
				sameSite: 'lax', // csrf
				secure: __prod__ // cookie only work in https
			},
			saveUninitialized: false,
			secret: 'zxcvbnm',
			resave: false,
		})
	)

	//orm
	const apolloServer = new ApolloServer({
		schema: buildSchema({
			resolvers: [HelloResolver, PostResolver, UserResolver],
			validate: false
		}),
		context: ({ req, res }): MyContext => ({ em: orm.em, req, res })
	});
	apolloServer.applyMiddleware({ app });

	// app.get('/', (_, res) => {
	// 	res.send('hello world');
	// });
	app.listen(5000, () => {
		console.log('server started on http://localhost:5000');
	});
};

main().catch(err => {
	console.error(err);
});