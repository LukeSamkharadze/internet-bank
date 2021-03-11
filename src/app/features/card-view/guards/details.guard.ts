import { Injectable } from '@angular/core';
import {
  UrlTree,
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { ViewIdentifierService } from '../services/view-identifier.service';

@Injectable({
  providedIn: 'root',
})
export class DetailsGuard implements CanActivate {
  static redirectUrl: UrlTree;

  constructor(
    private viewService: ViewIdentifierService,
    private authService: AuthService,
    private router: Router
  ) {
    DetailsGuard.redirectUrl = this.router.parseUrl('/accounts-list');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | UrlTree {
    const path = route.url[Math.max(route.url.length - 2, 0)].path;
    const id = Number(route.params.id);
    const service = this.viewService.determineService(path);

    if (!service) {
      return DetailsGuard.redirectUrl;
    }

    return service.getById(id).pipe(
      map((item) => {
        if (item && item.userId === this.authService.userId) {
          return true;
        }
        return DetailsGuard.redirectUrl;
      }),
      catchError(() => of(DetailsGuard.redirectUrl))
    );
  }
}
