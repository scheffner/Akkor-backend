import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SelfOrEmployeOrAdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      return false;
    }
    const payload = this.jwtService.verify(token);
    const userId = payload.sub;
    const userRole = payload.role;
    const idUserUpdated = request.params.id;
    return (
      userId === idUserUpdated || userRole === 'admin' || userRole === 'user'
    );
  }
}
