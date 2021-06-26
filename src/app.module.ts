import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BoardsModule } from './boards/boards.module';
import { TareasModule } from './tareas/tareas.module';
import { ColumnsModule } from './columns/columns.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SisconfigModule } from './sysconfig/sysconfig.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ToolsModule } from './tools/tools.module';
import { StudentsModule } from './students/students.module';
import { ProfessorsModule } from './professors/professors.module';
import { AdminsModule } from './admins/admins.module';
import { FriendRequestModule } from './friend-request/friend-request.module';
import { CollaborationRequestModule } from './collaboration-request/collaboration-request.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    BoardsModule,
    TareasModule,
    ColumnsModule,
    AuthModule,
    UsersModule,
    SisconfigModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ToolsModule,
    StudentsModule,
    ProfessorsModule,
    AdminsModule,
    FriendRequestModule,
    CollaborationRequestModule,
    StatisticsModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
