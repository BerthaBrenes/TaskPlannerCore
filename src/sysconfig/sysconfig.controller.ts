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
     * Get the system configuration
     * @param id of the user
     */
  @Get('/:id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiOperation({ summary: 'Get the system configuration' })
  @UsePipes(ValidationPipe)
  async getColumns(@Param('id') id: string) {
    this.logger.verbose(`get a system config ${id}`);
    return await this.sisconfigService.getConfig(id);
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
   * Add a type of the tablero in config
   * @param id of the user
   * @param type status of the request
   */
  @Put('/:id/:type')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: ' Add a type of the tablero in config' })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async changeStatus(@Param('id') id: string, @Param('type') type: tableroType) {
    return this.sisconfigService.addTableroType(id, type);
  }
  /**
   *  Set the url of the profile photo
   * @param id of the user
   * @param url status of the request
   */
  @Put('/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: ' Add a type of the tablero in config' })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async changeProphile(@Param('id') id: string, @Body('url') url: string) {
    return this.sisconfigService.editProfilePhoto(id, url);
  }
  /**
   * shutdown event
   * @param signal event
   */
  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }

}

