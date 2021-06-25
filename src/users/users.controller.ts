import { Controller, OnApplicationShutdown, Logger, Post, UsePipes, ValidationPipe, Body, Delete, Param, Patch, Get, Put } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiOperation, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { userDTO } from './dto/student.dto';
import { professorDTO } from './dto/profesor.dto';
import { adminDTO } from './dto/admin.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController implements OnApplicationShutdown {
  /**
  * Variable for the logger
  */
  private logger: Logger = new Logger('Sis Controller');

  constructor(private readonly userService: UsersService) { }
  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }
  /**
  * Create a new user
  * @param data of the user
  */
  @Post('student')
  @ApiBody({ required: true, type: userDTO })
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Create a new user' })
  @UsePipes(ValidationPipe)
  async createUser(@Body() data: userDTO) {
    this.logger.verbose(`Create an student user`);
    return await this.userService.createStudent(data);
  }
  /**
  * Create a new professor user
  * @param data of the user
  */
  @Post('profesor')
  @ApiBody({ required: true, type: professorDTO })
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Create a new professor user' })
  @UsePipes(ValidationPipe)
  async createProfessor(@Body() data: professorDTO) {
    this.logger.verbose(`Create a professor user`);
    return await this.userService.createProfessor(data);
  }
  /**
   * Create a new admin user
   * @param data of the user
   */
  @Post('admin')
  @ApiBody({ required: true, type: adminDTO })
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Create a new admin user' })
  @UsePipes(ValidationPipe)
  async createAdmin(@Body() data: adminDTO) {
    this.logger.verbose(`Create a admin user`);
    return await this.userService.createAdmin(data);
  }

  /**
   * update the student data
   * @param id of the user
   * @param data of the student
   */
  @Patch('student/:id')
  @ApiParam({ name: 'id' })
  @ApiBody({ required: true, type: userDTO })
  @ApiOperation({ summary: 'Update the data of a tarea' })
  @ApiNotFoundResponse({ description: 'tarea id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async updateTarea(@Param('id') id: string, @Body() data: userDTO) {
    return this.userService.updateStudent(id, data);
  }
  
  /**
   * Validate the email of the user exist
   * @param email of the person
   */
  @Get('validate/:email')
  @ApiParam({ name: 'email' })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'owner id not found' })
  @ApiOperation({ summary: 'Get the system configuration' })
  @UsePipes(ValidationPipe)
  async getTareasByOwmer(@Param('email') email: string) {
    this.logger.verbose(`Get the tareas by the owner ${email}`);
    return await this.userService.validateUser(email);
  }
  /**
   * update the professor data
   * @param id of the user
   * @param data of the professor
   */
  @Patch('professor/:id')
  @ApiParam({ name: 'id' })
  @ApiBody({ required: true, type: professorDTO })
  @ApiOperation({ summary: 'Update the data of a tarea' })
  @ApiNotFoundResponse({ description: 'tarea id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async updateProfesor(@Param('id') id: string, @Body() data: professorDTO) {
    return this.userService.updateProfessor(id, data);
  }
  /**
     * Add new friends to the current list
     * @param id of the user
     * @param data of the professor
     */
  @Patch('friends/:id')
  @ApiParam({ name: 'id' })
  @ApiBody({ required: true })
  @ApiOperation({ summary: 'Add new friends to the current list' })
  @ApiNotFoundResponse({ description: 'tarea id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async updateFriend(@Param('id') id: string, @Body() data: { friends: string }) {
    return this.userService.addFriends(id, data.friends);
  }
  /**
  * Delete an friend of an user
  * @param id of the user
  */
  @Delete('friends/:id/:idF')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete an user' })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async deleteFriends(@Param('id') id: string, @Param('idF') idF: string) {
    this.logger.verbose(`Delete an user ${id}`);
    return this.userService.deleteFriend(id, idF);
  }
  /**
  * Delete a tablero id of an user
  * @param id of the user
  * @param idT of the tablero
  */
  @Delete('tablero/:id/:idT')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete tablero id' })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async deleteTableroOwner(@Param('id') id: string, @Param('idT') idT: string) {
    this.logger.verbose(`Delete tablero id  of the user ${id}`);
    return this.userService.deleteTableroOwner(id, idT);
  }
  /**
   * Delete and id of the tablero friends of the user
   * @param id of the user
   * @param idT of the tablero
   */
  @Delete('tableroFriends/:id/:idT')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete and id of the tablero friends of the user' })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async deleteTableroFriends(@Param('id') id: string, @Param('idT') idT: string) {
    this.logger.verbose(`Delete and id of the tablero friends of the user ${id}`);
    return this.userService.deleteTableroFriends(id, idT);
  }
  /**
  * Delete an user
  * @param id of the user
  */
  @Delete('/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete an user' })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async deleteColumn(@Param('id') id: string) {
    this.logger.verbose(`Delete an user ${id}`);
    return this.userService.deleteUser(id);
  }

  /**
   * Add a tablero id to the user data
   * @param idU id of the user
   * @param idT id of the tablero
   */
  @Put('TableroOwner/:idUser/:idTablero')
  @ApiParam({ name: 'idUser', description: 'id of the user' })
  @ApiParam({ name: 'idTablero', description: 'id of the tablero' })
  @ApiBody({ required: true })
  @ApiOperation({ summary: ' Add a tablero id to the user data' })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async addTableroOwner(@Param('idUser') idU: string, @Param('idTablero') idT: string) {
    this.logger.verbose('Add a tablero id to the user data');
    return this.userService.addTableroOwner(idU, idT);
  }
  /**
   * Add a friend id to the tablero friend user data
   * @param idU id of the user
   * @param idF id of the friend
   */
  @Put('TableroFriends/:idUser/:idFriend')
  @ApiParam({ name: 'idUser', description: 'id of the user' })
  @ApiParam({ name: 'idFriend', description: 'id of the friend' })
  @ApiBody({ required: true })
  @ApiOperation({ summary: ' Add a id in the tablero friend to the user data' })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async addTableroFriends(@Param('idUser') idU: string, @Param('idFriend') idF: string) {
    this.logger.verbose('Add a friend id to the tablero friend user data');
    return this.userService.addTableroFriends(idU, idF);
  }
  /**
   * Edit the a new profile photo in the database
   * @param idU id of the user
   * @param idF id of the friend
   */
  @Put('profilePhoto/:idUser/:url')
  @ApiParam({ name: 'idUser', description: 'id of the user' })
  @ApiParam({ name: 'url', description: 'url of the photo' })
  @ApiBody({ required: true })
  @ApiOperation({ summary: 'Edit the a new profile photo in the database' })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async editProfilePhoto(@Param('idUser') idU: string, @Param('url') url: string) {
    this.logger.verbose('Edit the a new profile photo in the database');
    return this.userService.editProfilePhoto(idU, url);
  }


}
