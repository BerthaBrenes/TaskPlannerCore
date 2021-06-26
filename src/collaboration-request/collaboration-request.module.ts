import { Module } from '@nestjs/common';
import { CollaborationRequestService } from './collaboration-request.service';
import { CollaborationRequestController } from './collaboration-request.controller';
import { CollaborationRequestRepository } from './collaboration-request.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRepository } from 'src/students/students.repository';
import { BoardsRepository } from 'src/boards/boards.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ 
      CollaborationRequestRepository, 
      StudentRepository, 
      BoardsRepository])
  ],
  providers: [CollaborationRequestService],
  controllers: [CollaborationRequestController]
})
export class CollaborationRequestModule {}
