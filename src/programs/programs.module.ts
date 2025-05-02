import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [],
  controllers: [ProgramsController],
  providers: [ProgramsService, PrismaService, UserService],
})
export class ProgramsModule {}
