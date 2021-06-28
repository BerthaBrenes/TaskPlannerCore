import { Controller, OnApplicationShutdown, Post, UsePipes, ValidationPipe, Body, Logger, Get, Param, Delete, Patch, Put } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasDTO } from './dto/tareas.dto';
import { PriorityType } from './dto/priorityType.enum';


@Controller('tareas')
export class TareasController implements OnApplicationShutdown {

  private logger: Logger = new Logger('Sis Controller');


  constructor(private readonly service: TareasService) { }


  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() data: TareasDTO) {
    this.logger.verbose(`Create a config`);
    return this.service.createTarea(data);
  }

  @Get('column/:id')
  @UsePipes(ValidationPipe)
  async getTaskByColumns(@Param('id') id: string) {
    this.logger.verbose(`get a tarea by the column ${id}`);
    return this.service.getTareaByColumn(id);
  }

  @Get('owner/:id')
  @UsePipes(ValidationPipe)
  async getTasksByOwner(@Param('id') id: string) {
    this.logger.verbose(`Get the tareas by the owner ${id}`);
    return this.service.getTareasByOwner(id);
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  async deleteTask(@Param('id') id: string) {
    this.logger.verbose(`Delete a tarea ${id}`);
    return this.service.delete(id);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updateTask(@Param('id') id: string, @Body() data: TareasDTO) {
    return this.service.updateTarea(id, data);
  }

  @Put('dependency/:id/:dependency')
  @UsePipes(ValidationPipe)
  async addDependency(@Param('id') id: string, @Param('dependency') dependency: string) {
    return this.service.addDependency(id, dependency);
  }

  @Put('column/:id/:column')
  @UsePipes(ValidationPipe)
  async changeColumn(@Param('id') id: string, @Param('column') column: string) {
    return this.service.changeColumn(id, column);
  }

  @Put('priority/:id/:priority')
  @UsePipes(ValidationPipe)
  async changePriority(@Param('id') id: string, @Param('priority') priority: PriorityType) {
    return this.service.changePriority(id, priority);
  }

  /**
   * proper shutdown of the microservice
   * @param signal event
   */
  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }
}
