import { Injectable } from '@nestjs/common';
import { ColumnsRepository } from './columns.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(ColumnsRepository)
        private columnsRepository: ColumnsRepository){} 
}
