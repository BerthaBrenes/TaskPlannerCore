import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TablerosModule } from './tableros/tableros.module';
import { TareasModule } from './tareas/tareas.module';
import { ColumnsModule } from './columns/columns.module';
import { AuthModule } from './auth/auth.module';
import { RequestModule } from './request/request.module';
import { UsersModule } from './users/users.module';
import { SisconfigModule } from './sisconfig/sisconfig.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './columns/config/typeorm.config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    TablerosModule,
    TareasModule,
    ColumnsModule,
    AuthModule,
    RequestModule,
    UsersModule,
    SisconfigModule,
    TypeOrmModule.forRoot(typeOrmConfig)
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
