import { Controller, OnApplicationShutdown, Logger, Post, UsePipes, ValidationPipe, Body, Delete, Param, Patch, Get } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiOperation, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { SysConfigDTO } from 'src/sysconfig/dto/sysconfig.dto';
import { BoardDTO } from './dto/boards.dto';

@ApiTags('boards')
@Controller('boards')
export class BoardsController implements OnApplicationShutdown {
  /**
  * Variable for the logger
  */
  private logger: Logger = new Logger('Sis Controller');
  /**
   * First method in the tablero
   * @param tableroService Controller for tablero
   */
  constructor(private readonly tableroService: BoardsService) { }
  /**
 * Create a new tablero
 * @param data of the request
 */
  @Post()
  @ApiBody({ required: true, type: BoardDTO })
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Create a new tablero' })
  @UsePipes(ValidationPipe)
  async createColumn(@Body() data: BoardDTO) {
    this.logger.verbose(`Create a new tablero`);
    return await this.tableroService.createTablero(data);
  }
  /**
    * Delete the tablero
    * @param id of the column
    */
  @Delete('/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete the tablero' })
  @ApiNotFoundResponse({ description: 'Tablero id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async deleteColumn(@Param('id') id: string) {
    this.logger.verbose(`Delete the tablero ${id}`);
    return this.tableroService.deleteTablero(id);
  }
  /**
  * Update tablero 
  * @param id of the tablero
  * @param data status of the request
  */
  @Patch('/:id')
  @ApiParam({ name: 'id' })
  @ApiBody({ required: true, type: BoardDTO })
  @ApiOperation({ summary: 'Update the data of a tarea' })
  @ApiNotFoundResponse({ description: 'tarea id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async updateTarea(@Param('id') id: string, @Body() data: BoardDTO) {
    return this.tableroService.updateTablero(id, data);
  }
  /**
    * Get the tareas by the owner
    * @param id of the user
    */
  @Get('owner/:id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'owner id not found' })
  @ApiOperation({ summary: 'Get the system configuration' })
  @UsePipes(ValidationPipe)
  async getTareasByOwmer(@Param('id') id: string) {
    this.logger.verbose(`Get the tareas by the owner ${id}`);
    return await this.tableroService.getTByOwner(id);
  }
  /**
   * Get the Columns by a tablero
   * @param id of the columns
   */
  @Get('columns/:id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'column id not found' })
  @ApiOperation({ summary: 'Get the Columns by a tablero' })
  @UsePipes(ValidationPipe)
  async getTareasByColumns(@Param('id') id: string) {
    this.logger.verbose(`Get the Columns by a tablero ${id}`);
    return await this.tableroService.getTByOwner(id);
  }
  /**
   * shutdown event
   * @param signal event
   */
  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }
}
