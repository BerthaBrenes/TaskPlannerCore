import { Controller, OnApplicationShutdown, Post, UsePipes, ValidationPipe, Body, Logger, Delete, Param, Get, Put } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiNotFoundResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { RequestService } from './request.service';
import { requestDTO } from './dto/request.dto';
import { statusType } from './dto/statusType.enum';
/**
 * Component
 */
@ApiTags('Request')
@Controller('request')
export class RequestController implements OnApplicationShutdown {
  /**
     * Variable for the logger
     */
  private logger: Logger = new Logger('ColumnController');
  /**
     * First method in the component
     * @param requesService service request
     */
  constructor(private readonly requesService: RequestService) { }
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
   * Delete a request with the id
   * @param id of the column
   */
  @Delete('/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete a request with the id' })
  @ApiNotFoundResponse({ description: 'request id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async deleteColumn(@Param('id') id: string) {
    return this.requesService.deleteRequest(id);
  }
  /**
     * Get the columns of one tablero
     * @param id of the tablero
     */
  @Get('/:id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'tablero id not found' })
  @ApiOperation({ summary: 'Get the columns of one tablero' })
  @UsePipes(ValidationPipe)
  async getColumns(@Param('id') id: string) {
    this.logger.verbose(`Delete a column ${id}`);
    return await this.requesService.getRequest(id);
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
  /**
   * shutdown the process
   * @param signal event
   */
  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }
}
