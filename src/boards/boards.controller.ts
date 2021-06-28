import { Controller, OnApplicationShutdown, Logger, Post, UsePipes, ValidationPipe, Body, Delete, Param, Patch, Get, Put } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardDTO } from './dto/boards.dto';

@Controller('boards')
export class BoardsController implements OnApplicationShutdown {

  
  private logger: Logger = new Logger('Boards Controller');

  
  constructor(private readonly service: BoardsService) { }

  
  @Post()
  @UsePipes(ValidationPipe)
  async createNewBoard(@Body() data: BoardDTO) {
    this.logger.verbose(`Create a new board`);
    return this.service.createBoard(data);
  }
  
  @Delete('/:id')
  @UsePipes(ValidationPipe)
  async deleteBoard(@Param('id') id: string) {
    this.logger.verbose(`Delete the Board ${id}`);
    return this.service.deleteBoard(id);
  }
  
  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updateBoard(@Param('id') id: string, @Body() data: { description, name }) {
    this.logger.verbose(`Update the Board ${id}`);
    return this.service.updateBoard(id, data);
  }
  
  @Put('/:id/:col')
  @UsePipes(ValidationPipe)
  async addColumn(@Param('id') id: string, @Param('col') col: any) {
    this.logger.verbose(`Add column the Board ${id}`);
    return this.service.addColumn(id, col);
  }
  
  @Get('owner/:id')
  @UsePipes(ValidationPipe)
  async getBoards(@Param('id') id: string) {
    this.logger.verbose(`Get the boards made by the owner ${id}`);
    return this.service.getBoards(id);
  }
  
  @Get(':id')
  @UsePipes(ValidationPipe)
  async getBoard(@Param('id') id: string) {
    this.logger.verbose(`Get the board with the id ${id}`);
    return this.service.getBoard(id);
  }

  /**
   * shutdown event
   * @param signal event
   */
  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }
}
