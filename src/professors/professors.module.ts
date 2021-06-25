import { Module } from '@nestjs/common';
import { ProfessorsController } from './professors.controller';
import { ProfessorsService } from './professors.service';
import { professorRepository } from './professors.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([professorRepository])],
  controllers: [ProfessorsController],
  providers: [ProfessorsService]
})
export class ProfessorsModule {}
