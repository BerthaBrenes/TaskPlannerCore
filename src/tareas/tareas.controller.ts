import { Controller, OnApplicationShutdown, Post, UsePipes, ValidationPipe, Body, Logger, Get, Param, Delete, Patch, Put } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiOperation, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';
import { TareasService } from './tareas.service';
import { tareasDTO } from './dto/tareas.dto';
import { priorityType } from './dto/priorityType.enum';

@ApiTags('Tareas')
@Controller('tareas')
export class TareasController implements OnApplicationShutdown{
  /**
      * Variable for the logger
      */
     private logger: Logger = new Logger('Sis Controller');
  
  /**
   * First method in the tareas
   * @param tareaService Controller of the tareas
   */
    constructor( private readonly tareaService: TareasService){}
   
    /**
   * Create a new tarea
   * @param data of the tarea
   */
  @Post()
  @ApiBody({ required: true, type: tareasDTO })
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Create a new tarea' })
  @UsePipes(ValidationPipe)
  async createColumn(@Body() data: tareasDTO) {
    this.logger.verbose(`Create a config`);
    return await this.tareaService.createTarea(data);
  }
  /**
     * Get the tarea by the column
     * @param id of the user
     */
    @Get('column/:id')
    @ApiParam({ name: 'id' })
    @ApiResponse({ status: 200 })
    @ApiNotFoundResponse({ description: 'column id not found' })
    @ApiOperation({ summary: 'Get the tarea by the column' })
    @UsePipes(ValidationPipe)
    async getColumns(@Param('id') id: string) {
        this.logger.verbose(`get a tarea by the column ${id}`);
        return await this.tareaService.getTareaByColumn(id);
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
        return await this.tareaService.getTareasByOwner(id);
    }
    /**
     * Delete a tarea
     * @param id of the column
     */
    @Delete('/:id')
    @ApiParam({ name: 'id' })
    @ApiOperation({ summary: 'Delete a tarea' })
    @ApiNotFoundResponse({ description: 'tarea id not found' })
    @ApiResponse({ status: 201 })
    @UsePipes(ValidationPipe)
    async deleteColumn(@Param('id') id : string){
      this.logger.verbose(`Delete a tarea ${id}`);
      return this.tareaService.delete(id);
    }
    /**
   * Update the data of a tarea
   * @param id of the user
   * @param type status of the request
   */
  @Patch('/:id')
  @ApiParam({ name: 'id' })
  @ApiBody({ required: true, type: tareasDTO })
  @ApiOperation({ summary: 'Update the data of a tarea' })
  @ApiNotFoundResponse({ description: 'tarea id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async updateTarea(@Param('id') id: string, @Body() data: tareasDTO) {
    return this.tareaService.updateTarea(id, data);
  }
  /**
   * Add a dependency in the tarea
   * @param id of tarea
   * @param dependency id of another tareas that has dependency
   */
  @Put('Dependency/:id/:dependency')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: ' Add a type of the tablero in config' })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async addDependency(@Param('id') id: string, @Param('dependency') dependency: string) {
    return this.tareaService.addDependency(id, dependency);
  }
  /**
   * Change the column of a tarea
   * @param id of the tarea
   * @param idColumn of the column
   */
  @Put('Column/:id/:column')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Change the column of a tarea' })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async changeColumn(@Param('id') id: string, @Param('column') column: string) {
    return this.tareaService.changeColumn(id, column);
  }
   /**
   * Change the priority of the tarea
   * @param id of tarea
   * @param dependency of the tarea
   */
  @Put('Priority/:id/:priority')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: ' Change the priority of the tarea' })
  @ApiNotFoundResponse({ description: 'tarea id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async changePriority(@Param('id') id: string, @Param('priority') priority: priorityType) {
    return this.tareaService.changePriority(id, priority);
  }
    /**
     * proper shutdown of the microservice
     * @param signal event
     */
    onApplicationShutdown(signal: string) {
        console.log(signal); // e.g. "SIGINT"
      }
}
