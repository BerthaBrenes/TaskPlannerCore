import { Injectable } from '@nestjs/common';
import { TableroRepository } from './tableros.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TablerosService {

    constructor(
        @InjectRepository(TableroRepository)
        private tableroRepo: TableroRepository
    ){}
}
