import { Module } from '@nestjs/common';
import { CollaborationRequestService } from './collaboration-request.service';
import { CollaborationRequestController } from './collaboration-request.controller';
import { CollaborationRequestRepository } from './collaboration-request.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ CollaborationRequestRepository])
  ],
  providers: [CollaborationRequestService],
  controllers: [CollaborationRequestController]
})
export class CollaborationRequestModule {}
