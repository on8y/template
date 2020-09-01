import path from 'path';
import { __prod__ } from './constants';
import { MikroORM } from '@mikro-orm/core';
import { Post } from './entities/Post';
import { User } from "./entities/User";

export default {
	migrations: {
		path: path.join(__dirname, './migrations'),
		pattern: /^[\w-]+\d+\.[tj]s$/,
		disableForeignKeys: false
	},
	entities: [Post, User],
	dbName: 'postgres',
	type: 'postgresql',
	debug: !__prod__,
	user: 'postgres',
	password: 'abcdefg'
} as Parameters<typeof MikroORM.init>[0];