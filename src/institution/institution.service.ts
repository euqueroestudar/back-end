import { Prisma, Institution } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InstitutionService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.InstitutionCreateInput): Promise<Institution> {
    return this.prisma.institution.create({
      data,
    });
  }

  async findOne(id: Prisma.InstitutionWhereUniqueInput) {
    const institution = await this.prisma.institution.findUnique({
      where: id,
    });

    if (!institution) {
      throw new NotFoundException('institution not found');
    }
    return institution;
  }

  async update(params: {
    where: Prisma.InstitutionWhereUniqueInput;
    data: Prisma.InstitutionUpdateInput;
  }): Promise<Institution> {
    const { where, data } = params;
    return this.prisma.institution.update({
      data,
      where,
    });
  }

  async delete(
    where: Prisma.InstitutionWhereUniqueInput,
  ): Promise<Institution> {
    return this.prisma.institution.delete({
      where,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.InstitutionWhereUniqueInput;
    where?: Prisma.InstitutionWhereInput;
    orderBy?: Prisma.InstitutionOrderByWithRelationInput;
  }): Promise<Institution[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.institution.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
