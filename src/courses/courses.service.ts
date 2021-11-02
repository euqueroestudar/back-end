import { Prisma, Courses } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CoursesCreateInput): Promise<Courses> {
    return this.prisma.courses.create({
      data,
    });
  }

  async findOne(id: Prisma.CoursesWhereUniqueInput) {
    const Courses = await this.prisma.courses.findUnique({
      where: id,
    });

    if (!Courses) {
      throw new NotFoundException('user not found');
    }
    return Courses;
  }

  async update(params: {
    where: Prisma.CoursesWhereUniqueInput;
    data: Prisma.CoursesUpdateInput;
  }): Promise<Courses> {
    const { where, data } = params;
    return this.prisma.courses.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.CoursesWhereUniqueInput): Promise<Courses> {
    return this.prisma.courses.delete({
      where,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CoursesWhereUniqueInput;
    where?: Prisma.CoursesWhereInput;
    orderBy?: Prisma.CoursesOrderByWithRelationInput;
  }): Promise<Courses[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.courses.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        id: true,
        name: true,
        type: true,
        startDate: true,
        endDate: true,
        branchId: true,
        Evaluation: true,
        author: {
          select: {
            id: true,
            username: true,
            person: {
              select: {
                name: true,
                lastname: true,
              },
            },
            password: false,
          },
        },
        Branch: true,
        authorId: true,
        duration: true,
        published: true,
        institution: true,
        scholarity: true,
        noticeLink: true,
        institutionId: true,
      },
    });
  }
}
