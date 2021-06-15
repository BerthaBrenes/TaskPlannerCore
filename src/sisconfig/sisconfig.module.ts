import { Module } from '@nestjs/common';
import { SisconfigService } from './sisconfig.service';
import { SisconfigController } from './sisconfig.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SisConfigRepository } from './sisconfig.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SisConfigRepository
    ])
  ],
  providers: [SisconfigService],
  controllers: [SisconfigController]
})
export class SisconfigModule {}
