import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { DepositService } from '../../shared/services/deposit.service';

@Injectable()
export class DepositDetailsGuard implements CanActivate {
  constructor(
    private depositService: DepositService,
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.depositService
      .getById(Number(next.paramMap.get('id')))
      .pipe(map((v) => v && v.userId === this.authService.userId));
  }
}
