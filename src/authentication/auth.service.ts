import { Prisma, Users } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAuthDto } from './dtos/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signup(data: Prisma.UsersCreateInput) {
    const { username, email, role } = data;
    const users: Users = await this.usersService.findEmail(email);

    if (!!users) {
      throw new BadRequestException('email in use');
    }

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(data.password, salt);
    const user = await this.usersService.create({
      username,
      email,
      password,
      role,
    });
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signin(data: Prisma.UsersCreateInput) {
    const { email, password } = data;
    const user: Users = await this.usersService.findEmail(email);
    if (!user) {
      throw new BadRequestException('user not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new BadRequestException('bad password');
    }
  }

  async validate(data: Prisma.UsersCreateInput) {
    const { email, password } = data;
    const user: Users = await this.usersService.findEmail(email);
    if (!user) {
      throw new BadRequestException('user not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return user;
    } else {
      throw new BadRequestException('bad password');
    }
  }

  async login(user: Users) {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async changePassword(
    id: Prisma.UsersWhereUniqueInput,
    oldPassword: string,
    newPassword: string,
  ) {
    const user: Users = await this.prisma.users.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        person: false,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw new BadRequestException('user not found');
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      throw new BadRequestException('password not match');
    }

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(newPassword, salt);

    const updatePassword = await this.prisma.users.update({
      where: {
        id: Number(id),
      },
      data: {
        password: password,
      },
    });

    return updatePassword;
  }

  async editAccount(params: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.users.update({
      data,
      where,
    });
  }

  async findOne(id: Prisma.UsersWhereUniqueInput) {
    const user = await this.usersService.findOne({
      id: Number(id),
    });
    return user;
  }
}
