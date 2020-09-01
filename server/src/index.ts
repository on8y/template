import { MikroORM } from '@mikro-orm/core';
import microConfig from './mikro-orm.config';
// import { Post } from './entities/Post';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';

import 'reflect-metadata';

const main = async () => {
	//ORM
	const orm = await MikroORM.init(microConfig);
	await orm.getMigrator().up();

	// cosnt post = orm.em.create(Post, {title: 'my first post'});
	// await orm.em.persistAndFlush(post);
	// console.log('--------------sql 2--------------');
	// await orm.em.nativeInsert(Post, { title: 'my first post 2'});
	// const posts = await orm.em.find(Post, {});
	// console.log(posts);

	//web server
	const app = express();
	const apolloServer = new ApolloServer({
		schema: buildSchema({
			resolvers: [HelloResolver, PostResolver],
			validate: false
		}),
		context: (/* {req, res}*/) => ({ em: orm.em })
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