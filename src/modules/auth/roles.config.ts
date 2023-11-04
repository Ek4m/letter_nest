import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from '../user/user.model';
import { UserRole } from '../user/user.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const token = request.headers['authorization'] as string;
    if (!token) return false;
    const pureToken = token.split(' ')[1];
    try {
      const service: Record<string, any> = new JwtService();
      const payload = service.decode(pureToken);
      const user = await User.findOne({
        where: { email: payload.email },
        attributes: ['role'],
      });
      if (user.role === UserRole.ADMIN) return true;
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
