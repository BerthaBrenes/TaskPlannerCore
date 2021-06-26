import { Controller, Logger, Post, UsePipes, ValidationPipe, Body, Put, Param, Get } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { requestDTO } from './dto/friend-request.dto';
import { ApiBody, ApiResponse, ApiNotFoundResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { statusType } from 'src/request/dto/statusType.enum';

@Controller('friend-request')
export class FriendRequestController {
      /**
     * Variable for the logger
     */
  private logger: Logger = new Logger('ColumnController');
  /**
     * First method in the component
     * @param requesService service request
     */
  constructor(private readonly requesService: FriendRequestService) { }
    /**
   * Create a new request
   * @param data of the request
   */
  @Post()
  @ApiBody({ required: true, type: requestDTO })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'tablero id not found' })
  @ApiOperation({ summary: 'Create a new request' })
  @UsePipes(ValidationPipe)
  async createColumn(@Body() data: requestDTO) {
    this.logger.verbose(`Create a request`);
    return await this.requesService.createRequest(data);
  }
    /**
   * Change a new status in the request
   * @param id of the request
   * @param status status of the request
   */
  @Put('/:id/:status')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Change a new status in the request' })
  @ApiNotFoundResponse({ description: 'request id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async changeStatus(@Param('id') id: string, @Param('status') status: statusType) {
    return this.requesService.setStatus(id, status);
  }
   /**
   * Get the request
   * @param id of the user from the request is
   */
  @Get('FromUser/:id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'request id not found' })
  @ApiOperation({ summary: 'Get the request' })
  @UsePipes(ValidationPipe)
  async getRequestFrom(@Param('id') id: string) {
    this.logger.verbose(`Get the request ${id}`);
    return await this.requesService.getRequestByFrom(id);
  }
   /**
   * Get the request
   * @param id of the tablero
   */
  @Get('ToUser/:id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'request id not found' })
  @ApiOperation({ summary: 'Get the request' })
  @UsePipes(ValidationPipe)
  async getRequestBy(@Param('id') id: string) {
    this.logger.verbose(`Get the request ${id}`);
    return await this.requesService.getRequestBy(id);
  }
}
