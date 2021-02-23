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
import { LoanService } from '../../shared/services/loan.service';

@Injectable()
export class LoanDetailsGuard implements CanActivate {
  constructor(
    private loanService: LoanService,
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
    return this.loanService
      .getById(Number(next.paramMap.get('id')))
      .pipe(map((v) => v && v.userId === this.authService.userId));
  }
}
