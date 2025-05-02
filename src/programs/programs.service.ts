import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProgramsService {

  constructor(private readonly prismaService: PrismaService) {}

  async create(CreateProgramDto: CreateProgramDto) {
    const newProgram = await this.prismaService.userPrograms.create({
      data: CreateProgramDto,
    });
    return newProgram;
  }

  async findAll() {
    return await this.prismaService.userPrograms.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.userPrograms.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, UpdateProgramDto: UpdateProgramDto) {

    return await this.prismaService.userPrograms.update({
      where: { id: id },
      data: UpdateProgramDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.userPrograms.delete({
      where: { id: id }
    });;
  }

  async finduserid(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        programs: true
      }
    });
    return user?.programs
  }
}
