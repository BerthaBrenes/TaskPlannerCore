import { TypeOrmModuleOptions } from '@nestjs/typeorm';
/**
 * File with the configuration to the database
 */
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    host: 'mongodb+srv://db_client:tpmdb_client2021@taskplannerce.vdwdf.mongodb.net/taskplannerdb?retryWrites=true&w=majority',
    port: 27017,
    username: 'db_client',
    password: 'tpmdb_client2021',
    database: 'taskplannerdb',
    entities: [
        'dist/**/*.entity.js',
        './**/*.entity.js'],
    synchronize: true,
    useUnifiedTopology: true,
    ssl: true
}

const a = 1;
