import { Controller, OnApplicationShutdown, Delete, ValidationPipe, UsePipes, Param, Get, Logger, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiResponse, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';
import { ColumnsService } from './columns.service';
import { ColumnsDTO } from './dto/columns.dto';

/**
 * Controller
 */
@ApiTags('Columns')
@Controller('columns')
export class ColumnsController implements OnApplicationShutdown {

    private logger: Logger = new Logger('ColumnController');

    constructor(private readonly columnService: ColumnsService){}

    @Delete('/:id')
    @UsePipes(ValidationPipe)
    async deleteColumn(@Param('id') id : string){
      return this.columnService.deleteColumn(id);
    }

    @Get('/:id')
    @UsePipes(ValidationPipe)
    async getColumns(@Param('id') id: string) {
        this.logger.verbose(`Delete a column ${id}`);
        return this.columnService.getColumnsByBoard(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createColumn(@Body() data: ColumnsDTO) {
        this.logger.verbose(`Create a columns`);
        return this.columnService.createColumns(data);
    }
    
    /**
     * Function that regulate the shutdown
     * @param signal event
     */
    onApplicationShutdown(signal: string) {
        console.log(signal); // e.g. "SIGINT"
      }
}
