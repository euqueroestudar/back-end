import { Address, Users } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
  ): Promise<Address[]> {
    return this.addressService.findAll({
      skip: Number(skip) || undefined,
      take: Number(take) || undefined,
      orderBy: { id: 'asc' },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.addressService.findOne({ id: Number(id) });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@CurrentUser() user: Users, @Body() data: any) {
    return await this.addressService.update({
      where: { id: user.id },
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @CurrentUser() user: Users,
    @Body()
    addressData: any,
  ): Promise<Address> {
    return this.addressService.create({
      ...addressData,
      user: {
        connect: {
          id: user.id,
        },
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@CurrentUser() user: Users) {
    return this.addressService.delete({ userId: Number(user.id) });
  }
}
