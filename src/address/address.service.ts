import { Prisma, Address } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AddressCreateInput): Promise<Address> {
    return this.prisma.address.create({
      data,
    });
  }

  async findOne(id: Prisma.AddressWhereUniqueInput) {
    const address = await this.prisma.address.findUnique({
      where: id,
    });

    if (!address) {
      throw new NotFoundException('address not found');
    }
    return address;
  }

  async update(params: {
    where: Prisma.AddressWhereUniqueInput;
    data: Prisma.AddressUpdateInput;
  }): Promise<Address> {
    const { where, data } = params;
    return this.prisma.address.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.AddressWhereUniqueInput): Promise<Address> {
    return this.prisma.address.delete({
      where,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AddressWhereUniqueInput;
    where?: Prisma.AddressWhereInput;
    orderBy?: Prisma.AddressOrderByWithRelationInput;
  }): Promise<Address[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.address.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
