import { TypeOrmModuleOptions } from '@nestjs/typeorm';
/**
 * File with the configuration to the database
 */
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    url: 'mongodb+srv://db_client:tpmdb_client2021@taskplannerce.vdwdf.mongodb.net/taskplannerdb?retryWrites=true&w=majority&ssl=true',
    port: 27017,
    useNewUrlParser: true,
    entities: [
        'dist/**/*.entity.js',
        './**/*.entity.js'],
    synchronize: false,
    useUnifiedTopology: true,
    ssl: true
}