import { Module } from '@nestjs/common';
import { ProfessorsController } from './professors.controller';
import { ProfessorsService } from './professors.service';
import { ProfessorRepository } from './professors.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfessorRepository, UserRepository])
  ],
  controllers: [ProfessorsController],
  providers: [ProfessorsService]
})
export class ProfessorsModule {}
