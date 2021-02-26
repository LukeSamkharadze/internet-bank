import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { DepositService } from '../../shared/services/deposit.service';

@Injectable()
export class DepositDetailsGuard implements CanActivate {
  constructor(
    private depositService: DepositService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.depositService.getById(Number(next.paramMap.get('id'))).pipe(
      map((deposit) =>
        deposit && deposit.userId === this.authService.userId
          ? true
          : this.router.parseUrl('/accounts-list')
      ),
      catchError(() => of(this.router.parseUrl('/accounts-list')))
    );
  }
}
