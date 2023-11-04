import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
export const jwtConstants = {
  secret: process.env.PASSWORD_SECRET_KEY,
};
