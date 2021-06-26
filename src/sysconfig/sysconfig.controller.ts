import { Controller, OnApplicationShutdown, Post, UsePipes, ValidationPipe, Body, Logger, Get, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiNotFoundResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { SysConfigService } from './sysconfig.service';
import { SysConfigDTO } from './dto/sysconfig.dto';
import { tableroType } from 'src/boards/dto/tableroType.enum';

@ApiTags('System Configuration')
@Controller('config')
export class SysConfigController implements OnApplicationShutdown {
  /**
      * Variable for the logger
      */
  private logger: Logger = new Logger('Sys Controller');
  /**
   * First method in the constructor
   * @param sisconfigService Controller for the service
   */
  constructor(private readonly sisconfigService: SysConfigService) { }

  /**
   * Create a new config system
   * @param data of the request
   */
  @Post()
  @ApiBody({ required: true, type: SysConfigDTO })
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Create a new config system' })
  @UsePipes(ValidationPipe)
  async createColumn(@Body() data: SysConfigDTO) {
    this.logger.verbose(`Create a config`);
    return await this.sisconfigService.CreateConfig(data);
  }

  /**
     * Get the hobbies system configuration
     * @param id of the user
     */
  @Get('hobbies')
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Get the hobbies system configuration' })
  @UsePipes(ValidationPipe)
  async getHobbies() {
    this.logger.verbose(`Get the hobbies system configuration `);
    return await this.sisconfigService.getHobbies();
  }
  /**
     * Get the system user configuration
     * @param id of the user
     */
    @Get('SysConfig')
    @ApiResponse({ status: 200 })
    @ApiOperation({ summary: 'Get the system user configuration' })
    @UsePipes(ValidationPipe)
    async getSysConfig() {
      this.logger.verbose(`Get the system user configuration `);
      return await this.sisconfigService.getSysUser();
    }
    /**
     * Get the avatar system configuration
     * @param id of the user
     */
  @Get('avatar')
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Get the avatar system configuration' })
  @UsePipes(ValidationPipe)
  async getAvatar() {
    this.logger.verbose(`Get the avatar system configuration`);
    return await this.sisconfigService.getAvatar();
  }
  /**
     * Get the hobbies system configuration
     * @param id of the user
     */
    @Get('types')
    @ApiResponse({ status: 200 })
    @ApiNotFoundResponse({ description: 'user id not found' })
    @ApiOperation({ summary: 'Get the types system configuration' })
    @UsePipes(ValidationPipe)
    async getColumns() {
      this.logger.verbose(`Get the types system configuration `);
      return await this.sisconfigService.getBoardTypes();
    }

  /**
   * Delete a config by the user
   * @param id of the column
   */
  @Delete('/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete a config by the user' })
  @ApiNotFoundResponse({ description: 'config id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async deleteColumn(@Param('id') id: string) {
    return this.sisconfigService.deleteConfig(id);
  }

  /**
   * Add a type in config
   * @param lastModifi of the user
   * @param type status of the request
   */
  @Put('types/:lastModifi/:type')
  @ApiParam({ name: 'lastModifi' })
  @ApiParam({ name: 'type' })
  @ApiOperation({ summary: ' Add a type in config' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async editBoardTypes(@Param('lastModifi') lastModifi: string, @Param('type') type: string[]) {
    return this.sisconfigService.editBoardTypes(type, lastModifi);
  }
  /**
   * Add hobbies in config
   * @param lastModifi of the user
   * @param hobbies status of the request
   */
  @Put('types/:lastModifi/:hobbies')
  @ApiParam({ name: 'lastModifi' })
  @ApiParam({ name: 'hobbies' })
  @ApiOperation({ summary: ' Add hobbies in config' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async editHobbies(@Param('lastModifi') lastModifi: string, @Param('hobbies') hobbies: string[]) {
    return this.sisconfigService.editHobbies(hobbies, lastModifi);
  }
  /**
   * Add sysUsers in config
   * @param lastModifi of the user
   * @param sysUsers status of the request
   */
  @Put('types/:lastModifi/:sysUsers')
  @ApiParam({ name: 'lastModifi' })
  @ApiParam({ name: 'sysUsers' })
  @ApiOperation({ summary: ' Add sysUsers in config' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async editSysUser(@Param('lastModifi') lastModifi: string, @Param('sysUsers') sysUsers: string[]) {
    return this.sisconfigService.editSystemUser(sysUsers, lastModifi);
  }
  /**
   * Add avatars in config
   * @param lastModifi of the user
   * @param hobbies status of the request
   */
  @Put('types/:lastModifi/:avatars')
  @ApiParam({ name: 'lastModifi' })
  @ApiParam({ name: 'avatars' })
  @ApiOperation({ summary: ' Add avatars in config' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async editAvatars(@Param('lastModifi') lastModifi: string, @Param('avatars') avatars: string[]) {
    return this.sisconfigService.editAvatarList(avatars, lastModifi);
  }
  /**
   * shutdown event
   * @param signal event
   */
  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }

}

