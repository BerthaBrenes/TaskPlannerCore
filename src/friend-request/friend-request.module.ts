import { Module } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { FriendRequestRepository } from './friend.request.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ FriendRequestRepository])
  ],
  providers: [FriendRequestService],
  controllers: [FriendRequestController]
})
export class FriendRequestModule {}
