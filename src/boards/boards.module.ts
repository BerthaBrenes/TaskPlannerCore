import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsRepository } from './boards.repository';
import { StudentRepository } from 'src/students/students.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BoardsRepository,
      StudentRepository
    ])
  ],
  providers: [BoardsService],
  controllers: [BoardsController]
})
export class BoardsModule {}
