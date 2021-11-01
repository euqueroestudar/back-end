import { Users } from '.prisma/client';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { AuthService } from './auth.service';
import { Public } from './decorators/public-router.decorator';
import { ChangePasswordAuthDto } from './dtos/change-password.dto';
import { CreateAuthDto } from './dtos/create-user.dto';
import { UpdateAuthDto } from './dtos/update-auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/auth/signup')
  @HttpCode(201)
  signup(@Body() data: CreateAuthDto) {
    return this.authService.signup(data);
  }

  @Public()
  @HttpCode(200)
  @Post('/auth/login')
  signin(@Body() data: Users) {
    return this.authService.signin(data);
  }

  @Serialize(ChangePasswordAuthDto)
  @UseGuards(JwtAuthGuard)
  @Post('/auth/change-password')
  changePassword(@CurrentUser() user, @Body() data: ChangePasswordAuthDto) {
    return this.authService.changePassword(
      user.id,
      data.oldPassword,
      data.newPassword,
    );
  }

  @Serialize(UpdateAuthDto)
  @UseGuards(JwtAuthGuard)
  @Post('/auth/edit-account')
  async editAccount(@CurrentUser() user: Users, @Body() data: UpdateAuthDto) {
    return await this.authService.editAccount({
      where: { id: user.id },
      data,
    });
  }

  @HttpCode(200)
  @Post('/auth/lost-password')
  lostpassword(@Body() data) {
    return 'ok';
  }

  @UseGuards(JwtAuthGuard)
  @Get('/auth/user')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('/auth/whoami')
  @UseGuards(JwtAuthGuard)
  whoAmI(@CurrentUser() user: Users) {
    return user;
  }
}
