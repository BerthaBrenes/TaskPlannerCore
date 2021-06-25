import { Module } from '@nestjs/common';
import { SysConfigService } from './sysconfig.service';
import { SysConfigController } from './sysconfig.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysConfigRepository } from './sysconfig.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SysConfigRepository
    ])
  ],
  providers: [SysConfigService],
  controllers: [SysConfigController]
})
export class SisconfigModule {}
