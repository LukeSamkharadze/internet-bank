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
import { LoanService } from '../../shared/services/loan.service';

@Injectable()
export class LoanDetailsGuard implements CanActivate {
  constructor(
    private loanService: LoanService,
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
    return this.loanService.getById(Number(next.paramMap.get('id'))).pipe(
      map((loan) =>
        loan && loan.userId === this.authService.userId
          ? true
          : this.router.parseUrl('/accounts-list')
      ),
      catchError(() => of(this.router.parseUrl('/accounts-list')))
    );
  }
}
