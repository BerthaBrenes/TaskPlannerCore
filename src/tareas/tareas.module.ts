import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareasRepository } from './tareas.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    TareasRepository
  ])],
  providers: [TareasService],
  controllers: [TareasController]
})
export class TareasModule {}
