import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { jwtConstants } from './jwt.guard';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private userService: UserService;
  constructor(usrSrc: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
    this.userService = usrSrc;
  }

  async validate(payload: any) {
    const user = await this.userService.getUserByEmail(payload.email);
    if (!user) throw new UnauthorizedException();
    return user.get();
  }
}
