import { Module } from '@nestjs/common';
import { TablerosService } from './tableros.service';
import { TablerosController } from './tableros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableroRepository } from './tableros.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TableroRepository
    ])
  ],
  providers: [TablerosService],
  controllers: [TablerosController]
})
export class TablerosModule {}
