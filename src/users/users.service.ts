import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Users, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private repo: PrismaService) {}

  async create(data: Prisma.UsersCreateInput): Promise<Users> {
    return this.repo.users.create({
      data,
    });
  }

  async findOne(id: Prisma.UsersWhereUniqueInput) {
    const user = await this.repo.users.findUnique({
      where: id,
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async update(params: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }): Promise<Users> {
    const { where, data } = params;
    return this.repo.users.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UsersWhereUniqueInput): Promise<Users> {
    return this.repo.users.delete({
      where,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UsersWhereUniqueInput;
    where?: Prisma.UsersWhereInput;
    orderBy?: Prisma.UsersOrderByWithRelationInput;
  }): Promise<Users[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.repo.users.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
