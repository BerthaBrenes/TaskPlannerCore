import { Controller, OnApplicationShutdown, Post, UsePipes, ValidationPipe, Body, Logger, Get, Param, Put } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiNotFoundResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { SysConfigService } from './sysconfig.service';
import { SysConfigDTO } from './dto/sysconfig.dto';

@ApiTags('System Configuration')
@Controller('config')
export class SysConfigController implements OnApplicationShutdown {

  private logger: Logger = new Logger('Sys Controller');

  constructor(private readonly sysConfigService: SysConfigService) { }


  @Post()
  @ApiBody({ required: true, type: SysConfigDTO })
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Create a new config system' })
  @UsePipes(ValidationPipe)
  async createConfig(@Body() data: SysConfigDTO) {
    this.logger.verbose(`Create a config`);
    return this.sysConfigService.CreateConfig(data);
  }


  @Get('hobbies')
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Get the hobbies system configuration' })
  @UsePipes(ValidationPipe)
  async getHobbies() {
    this.logger.verbose(`Get the hobbies system configuration `);
    return this.sysConfigService.getHobbies();
  }

  @Get('uses')
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Get the system user configuration' })
  @UsePipes(ValidationPipe)
  async getSysConfig() {
    this.logger.verbose(`Get the system user configuration `);
    return this.sysConfigService.getSysUses();
  }

  @Get('avatar')
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Get the avatar system configuration' })
  @UsePipes(ValidationPipe)
  async getAvatar() {
    this.logger.verbose(`Get the avatar system configuration`);
    return this.sysConfigService.getAvatarList();
  }

  @Get('types')
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiOperation({ summary: 'Get the types system configuration' })
  @UsePipes(ValidationPipe)
  async getColumns() {
    this.logger.verbose(`Get the types system configuration `);
    return this.sysConfigService.getBoardTypes();
  }

  @Post('types/:by')
  @ApiParam({ name: 'by' })
  @ApiOperation({ summary: ' Add a type in config' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async editBoardTypes(@Param('by') by: string, @Body() type: string[]) {
    return this.sysConfigService.editBoardTypes(type, by);
  }

  @Post('hobbies/:by')
  @ApiParam({ name: 'by' })
  @ApiOperation({ summary: ' Add hobbies in config' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async editHobbies(@Param('by') by: string, @Body() hobbies: string[]) {
    return this.sysConfigService.editHobbies(hobbies, by);
  }

  @Post('uses/:by')
  @ApiParam({ name: 'by' })
  @ApiOperation({ summary: ' Add sysUsers in config' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async editSysUser(@Param('by') by: string, @Body() sysUsers: string[]) {
    return this.sysConfigService.editSystemUses(sysUsers, by);
  }


  @Post('avatar/:by')
  @ApiParam({ name: 'by' })
  @ApiOperation({ summary: ' Add avatars in config' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async editAvatars(@Param('by') by: string, @Body() avatars: string[]) {
    return this.sysConfigService.editAvatarList(avatars, by);
  }

  /**
   * shutdown event
   * @param signal event
   */
  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }

}

