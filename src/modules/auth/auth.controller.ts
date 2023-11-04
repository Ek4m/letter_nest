import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import {
  RefreshDto,
  RegisterDto,
  UpdateNameDto,
  UpdatePasswordDto,
} from '../user/user.dto';
import { LocalAuthGuard } from './local.guard';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async register(@Body() body: RegisterDto) {
    const user = await this.userService.register(body);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req) {
    return this.userService.login(req.user);
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  async getMe(@Request() req) {
    return await this.userService.getUserCredentials(req.user);
  }

  @Post('/refresh')
  async refresh(@Body() body: RefreshDto) {
    return this.userService.refresh(body);
  }

  @UseGuards(JwtGuard)
  @Post('update_name')
  async resetNames(@Request() req, @Body() body: UpdateNameDto) {
    return this.userService.resetName(req.user, body);
  }

  @UseGuards(JwtGuard)
  @Post('update_password')
  async updatePassword(@Request() req, @Body() body: UpdatePasswordDto) {
    return this.userService.updatePassword(req.user, body);
  }
}
