import { Controller, Logger, Post, UsePipes, ValidationPipe, Body, Get, Param, Delete } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { adminDTO } from './dto/admin.dto';
import { ApiBody, ApiResponse, ApiOperation, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('admins')
export class AdminsController {
/**
  * Variable for the logger
  */
  private logger: Logger = new Logger('Sis Controller');

  /**
   * First method in the component
   * @param admin Controller for the admin service
   */
  constructor(private readonly adminService: AdminsService) { }

   /**
   * Create a new admin user
   * @param data of the user
   */
  @Post()
  @ApiBody({ required: true, type: adminDTO })
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Create a new admin user' })
  @UsePipes(ValidationPipe)
  async createAdmin(@Body() data: adminDTO) {
    this.logger.verbose(`Create a admin user`);
    return await this.adminService.createAdmin(data);
  }
  /**
   * Validate the email of the user exist
   * @param id of the person
   */
  @Get('/:id')
  @ApiParam({ name: 'email' })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'owner id not found' })
  @ApiOperation({ summary: 'Get the system configuration' })
  @UsePipes(ValidationPipe)
  async getTareasByOwmer(@Param('id') id: string) {
    this.logger.verbose(`Get the tareas by the owner ${id}`);
    return await this.adminService.getAdmin(id);
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
    return this.adminService.deleteUser(id);
  }
  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }
}
