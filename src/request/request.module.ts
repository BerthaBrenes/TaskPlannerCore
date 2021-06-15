import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestRepository } from './request.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ RequestRepository])
  ],
  providers: [RequestService],
  controllers: [RequestController]
})
export class RequestModule {}
