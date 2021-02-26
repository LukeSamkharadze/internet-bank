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
import { CardService } from '../../shared/services/card.service';

@Injectable()
export class CardDetailsGuard implements CanActivate {
  constructor(
    private cardService: CardService,
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
    return this.cardService.getById(Number(next.paramMap.get('id'))).pipe(
      map((card) =>
        card && card.userId === this.authService.userId
          ? true
          : this.router.parseUrl('/accounts-list')
      ),
      catchError(() => of(this.router.parseUrl('/accounts-list')))
    );
  }
}
