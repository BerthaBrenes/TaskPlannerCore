import { TypeOrmModuleOptions } from '@nestjs/typeorm';
/**
 * File with the configuration to the database
 */
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    host: 'taskplannerdb.cczo0xw8oncg.us-east-2.rds.amazonaws.com',
    port: 5432,
    username: 'db_client',
    password:'tbmdb_client2021',
    database:  'taskplanner',
    entities: [
        'dist/**/*.entity.js',
        './**/*.entity.js'],
    synchronize: true,
    useUnifiedTopology: true,
    ssl: true
}