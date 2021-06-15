import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestRepository } from './request.repository';

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(RequestRepository)
        private requestRepository: RequestRepository){}
}
