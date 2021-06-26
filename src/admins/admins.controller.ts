import { Controller, Logger, Post, UsePipes, ValidationPipe, Body, Get, Param, Delete } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminDTO } from './dto/admin.dto';
import { ApiBody, ApiResponse, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('admins')
export class AdminsController {

  private logger: Logger = new Logger('Admin Controller');

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
  @ApiBody({ required: true, type: AdminDTO })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  async createAdmin(@Body() data: AdminDTO) {
    this.logger.verbose(`Create a admin user`);
    return this.adminService.createAdmin(data);
  }


  /**
   * Validate the email of the user exist
   * @param id of the person
   */
  @Get('/:id')
  @ApiParam({ name: 'email' })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'owner id not found' })
  @UsePipes(ValidationPipe)
  async getProfile(@Param('id') id: string) {
    this.logger.verbose(`Get the tareas by the owner ${id}`);
    return this.adminService.getAdmin(id);
  }


  /**
  * Delete an user
  * @param id of the user
  */
  @Delete('/:id')
  @ApiParam({ name: 'id' })
  @ApiNotFoundResponse({ description: 'user id not found' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  async deleteAdmin(@Param('id') id: string) {
    this.logger.verbose(`Delete an user ${id}`);
    return this.adminService.deleteAdmin(id);
  }


  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }
}
