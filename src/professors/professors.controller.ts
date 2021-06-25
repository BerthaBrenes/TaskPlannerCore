import { Controller, OnApplicationShutdown, Logger, Post, UsePipes, ValidationPipe, Body, Patch, Param, Delete, Put, Get } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { professorDTO } from './dto/professor.dto';
import { ApiBody, ApiResponse, ApiOperation, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('professors')
export class ProfessorsController implements OnApplicationShutdown{
    /**
  * Variable for the logger
  */
  private logger: Logger = new Logger('Sis Controller');

  constructor(private readonly professorService: ProfessorsService) { }
  /**
  * Create a new professor user
  * @param data of the user
  */
  @Post()
  @ApiBody({ required: true, type: professorDTO })
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Create a new professor user' })
  @UsePipes(ValidationPipe)
  async createProfessor(@Body() data: professorDTO) {
    this.logger.verbose(`Create a professor user`);
    return await this.professorService.createProfessor(data);
  }
  /**
   * update the professor data
   * @param id of the user
   * @param data of the professor
   */
  @Patch('/:id')
  @ApiParam({ name: 'id' })
  @ApiBody({ required: true, type: professorDTO })
  @ApiOperation({ summary: 'Update the data of a tarea' })
  @ApiNotFoundResponse({ description: 'tarea id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async updateProfesor(@Param('id') id: string, @Body() data: professorDTO) {
    return this.professorService.updateProfessor(id, data);
  }  
  /**
   * Delete and id of the tablero friends of the user
   * @param id of the user
   * @param idT of the tablero
   */
  @Delete('/:id/:idT')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete and id of the tablero friends of the user' })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async deleteTableroFriends(@Param('id') id: string, @Param('idT') idT: string) {
    this.logger.verbose(`Delete and id of the tablero friends of the user ${id}`);
    return this.professorService.deleteTableroFriends(id, idT);
  }
  /**
   * Add a friend id to the tablero friend user data
   * @param idU id of the user
   * @param idF id of the friend
   */
  @Put('/:idUser/:idFriend')
  @ApiParam({ name: 'idUser', description: 'id of the user' })
  @ApiParam({ name: 'idFriend', description: 'id of the friend' })
  @ApiBody({ required: true })
  @ApiOperation({ summary: ' Add a id in the tablero friend to the user data' })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async addTableroFriends(@Param('idUser') idU: string, @Param('idFriend') idF: string) {
    this.logger.verbose('Add a friend id to the tablero friend user data');
    return this.professorService.addTableroFriends(idU, idF);
  }
  /**
   * Validate the user exist
   * @param id of the person
   */
  @Get('/:id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'owner id not found' })
  @ApiOperation({ summary: 'Get the system configuration' })
  @UsePipes(ValidationPipe)
  async getTareasByOwmer(@Param('id') id: string) {
    this.logger.verbose(`Get an user ${id}`);
    return await this.professorService.getProfessor(id);
  }

  /**
   * On application shutdown
   * @param signal event
   */
  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }
}
