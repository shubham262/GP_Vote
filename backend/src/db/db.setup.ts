import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TitleEntity, UserEntity } from '../entities';
import { Env } from '../env';

export const AppDataSouce = new DataSource({
	type: 'mysql',
	database: Env.dbName,
	host: Env.host,
	username: Env.username,
	password: Env.password,
	port: Env.dbPort,
	logging: false,
	synchronize: false,
	entities: [UserEntity, TitleEntity],
	entitySkipConstructor: true,
	namingStrategy: new SnakeNamingStrategy(),
});
