import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareasRepository } from './tareas.repository';
import { ColumnsRepository } from 'src/columns/columns.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    TareasRepository,
    ColumnsRepository
  ])],
  providers: [TareasService],
  controllers: [TareasController]
})
export class TareasModule {}
