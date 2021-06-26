import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';
import { AdminsController } from './admins.controller';
import { AdminRepository } from './admins.repository';
import { AdminsService } from './admins.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminRepository, UserRepository])
  ],
  controllers: [AdminsController],
  providers: [AdminsService]
})
export class AdminsModule {}
