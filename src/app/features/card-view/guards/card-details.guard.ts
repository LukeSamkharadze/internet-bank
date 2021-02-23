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
import { CardService } from '../../shared/services/card.service';

@Injectable()
export class CardDetailsGuard implements CanActivate {
  constructor(
    private cardService: CardService,
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
    return this.cardService
      .getById(Number(next.paramMap.get('id')))
      .pipe(map((v) => v && v.userId === this.authService.userId));
  }
}
