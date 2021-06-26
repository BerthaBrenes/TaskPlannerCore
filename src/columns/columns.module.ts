import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsRepository } from './columns.repository';
import { BoardsRepository } from 'src/boards/boards.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ColumnsRepository,
      BoardsRepository
    ])
  ],
  providers: [ColumnsService],
  controllers: [ColumnsController]
})
export class ColumnsModule {}
