import { Controller, OnApplicationShutdown, Logger, Post, UsePipes, ValidationPipe, Body, Patch, Param, Delete, Put, Get } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { ProfessorDTO } from './dto/professor.dto';
import { ApiBody, ApiResponse, ApiOperation, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('professors')
export class ProfessorsController implements OnApplicationShutdown{
  
  /**
  * Variable for the logger
  */
  private logger: Logger = new Logger('Professor Controller');

  constructor(
    private readonly professorService: ProfessorsService
  ) { }
  
  /**
  * Create a new professor user
  * @param data of the user
  */
  @Post()
  @ApiBody({ required: true, type: ProfessorDTO })
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Create a new professor user' })
  @UsePipes(ValidationPipe)
  async createProfessor(@Body() data: ProfessorDTO) {
    this.logger.verbose(`Create a professor user`);
    return this.professorService.createProfessor(data);
  }

  
  /**
   * update the professor data
   * @param id of the user
   * @param data of the professor
   */
  @Patch('/:id')
  @ApiParam({ name: 'id' })
  @ApiBody({ required: true, type: ProfessorDTO })
  @ApiOperation({ summary: 'Update the data of a tarea' })
  @ApiNotFoundResponse({ description: 'tarea id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async updateProfessor(@Param('id') id: string, @Body() data: ProfessorDTO) {
    this.logger.verbose(`Update user ${id}`);
    return this.professorService.editProfile(id, data);
  }  
  
  
  /**
   * Delete and id of the board friends of the user
   * @param id of the user
   * @param idT of the board
   */
  @Delete('/:id/:idT')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete and id of the board friends of the user' })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async deleteSharedBoard(@Param('id') id: string, @Param('idT') idT: string) {
    this.logger.verbose(`Delete and id of the board friends of the user ${id}`);
    return this.professorService.deleteSharedBoard(id, idT);
  }
  
  
  /**
   * Add a friend id to the board friend user data
   * @param idU id of the user
   * @param idF id of the friend
   */
  @Put('/:idUser/:idFriend')
  @ApiParam({ name: 'idUser', description: 'id of the user' })
  @ApiParam({ name: 'idFriend', description: 'id of the friend' })
  @ApiBody({ required: true })
  @ApiOperation({ summary: ' Add a id in the board friend to the user data' })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async addSharedBoard(@Param('idUser') idU: string, @Param('idFriend') idF: string) {
    this.logger.verbose('Add a friend id to the board friend user data');
    return this.professorService.addSharedBoard(idU, idF);
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
  async getProfile(@Param('id') id: string) {
    this.logger.verbose(`Get an user ${id}`);
    return this.professorService.getProfile(id);
  }

  @Delete()
  deleteProfile(@Param('id') id: string) {
    this.logger.verbose(`Deleting user: ${id}`);
    return this.professorService.deleteProfile(id);
  }

  /**
   * On application shutdown
   * @param signal event
   */
  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }
}
