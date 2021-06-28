import { Module } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { FriendRequestRepository } from './friend.request.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRepository } from 'src/students/students.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ FriendRequestRepository, StudentRepository])
  ],
  providers: [FriendRequestService],
  controllers: [FriendRequestController]
})
export class FriendRequestModule {}
