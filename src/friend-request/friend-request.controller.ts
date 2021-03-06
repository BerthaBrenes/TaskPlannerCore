import { Controller, Logger, Post, UsePipes, ValidationPipe, Body, Param, Get, Patch } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { RequestDTO } from './dto/friend-request.dto';
import { StatusType } from 'src/data/statusType.enum';

@Controller('friend-request')
export class FriendRequestController {

  private logger: Logger = new Logger('Friend Request Controller');

  constructor(private readonly service: FriendRequestService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async createRequest(@Body() data: RequestDTO) {
    this.logger.verbose(`Create a friend request`);
    return this.service.createRequest(data);
  }

  @Patch('/:id/:status')
  @UsePipes(ValidationPipe)
  async changeStatus(@Param('id') id: string, @Param('status') status: StatusType) {
    return this.service.resolveRequest(id, status);
  }
  
  
  @Get('sent/:id')
  @UsePipes(ValidationPipe)
  async getSentRequests(@Param('id') id: string) {
    this.logger.verbose(`Get the sent requests of ${id}`);
    return this.service.getSentRequests(id);
  }


  @Get('received/:id')
  @UsePipes(ValidationPipe)
  async getReceivedRequest(@Param('id') id: string) {
    this.logger.verbose(`Get the received request of ${id}`);
    return this.service.getReceivedRequests(id);
  }
}
