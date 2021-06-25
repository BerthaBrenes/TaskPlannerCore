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
    /**
     * Variable for the logger
     */
    private logger: Logger = new Logger('ColumnController');
    /**
     * Constructor of the controller
     * @param columnService Service columns
     */
    constructor(private readonly columnService: ColumnsService){}
    /**
     * Delete a column
     * @param id of the column
     */
    @Delete('/:id')
    @ApiParam({ name: 'id' })
    @ApiOperation({ summary: 'Elimina una columna' })
    @ApiNotFoundResponse({ description: 'column id not found' })
    @ApiResponse({ status: 201 })
    @UsePipes(ValidationPipe)
    async deleteColumn(@Param('id') id : string){
      return this.columnService.deleteColumn(id);
    }
    /**
     * Get the columns of one tablero
     * @param id of the tablero
     */
    @Get('/:id')
    @ApiParam({ name: 'id' })
    @ApiResponse({ status: 200 })
    @ApiNotFoundResponse({ description: 'tablero id not found' })
    @ApiOperation({ summary: 'Get the columns of one tablero' })
    @UsePipes(ValidationPipe)
    async getColumns(@Param('id') id: string) {
        this.logger.verbose(`Delete a column ${id}`);
        return await this.columnService.getColumnByTablero(id);
    }
    /**
     * Create a new column 
     * @param data of the column
     */
    @Post()
    @ApiBody({ required: true, type: ColumnsDTO })
    @ApiResponse({ status: 200 })
    @ApiNotFoundResponse({ description: 'tablero id not found' })
    @ApiOperation({ summary: 'Get the columns of one tablero' })
    @UsePipes(ValidationPipe)
    async createColumn(@Body() data: ColumnsDTO) {
        this.logger.verbose(`Create a columns`);
        return await this.columnService.createColumns(data);
    }
    /**
     * Function that regulate the shutdown
     * @param signal event
     */
    onApplicationShutdown(signal: string) {
        console.log(signal); // e.g. "SIGINT"
      }
}
