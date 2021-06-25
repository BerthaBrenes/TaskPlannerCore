import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';
import { StudentsController } from './students.controller';
import { StudentRepository } from './students.repository';
import { StudentsService } from './students.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, StudentRepository]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
