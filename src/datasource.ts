import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as dbConfig from '../config/ormconfig.json';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: dbConfig.host,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  migrations: [__dirname + '/../db/migrations/*.ts'],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  seeds: [__dirname + '/../db/seeds/*.ts'],
  // factories: ['src/database/factories/**/*{.ts,.js}']
};

export const dataSource = new DataSource(options);
