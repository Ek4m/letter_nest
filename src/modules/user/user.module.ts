import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { LocalStrategy } from '../auth/local.strategy';

@Global()
@Module({
  exports: [UserService],
  providers: [UserService, LocalStrategy, JwtStrategy],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.PASSWORD_SECRET_KEY,
    }),
  ],
})
export class UserModule {}
