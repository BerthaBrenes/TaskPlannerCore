import { Injectable } from '@nestjs/common';
import { SisConfigRepository } from './sisconfig.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SisconfigService {
    constructor(
        @InjectRepository(SisConfigRepository)
        private sisconfigRepository: SisConfigRepository
    ){}
}
