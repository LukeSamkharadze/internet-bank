import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { ViewIdentifierService } from '../services/view-identifier.service';

@Injectable({
  providedIn: 'root',
})
export class DetailsGuard implements CanLoad {
  static redirectUrl: UrlTree;

  constructor(
    private viewService: ViewIdentifierService,
    private authService: AuthService,
    private router: Router
  ) {
    DetailsGuard.redirectUrl = this.router.parseUrl('/accounts-list');
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | UrlTree {
    const path = segments[Math.max(segments.length - 2, 0)].path;
    const id = Number(segments[Math.max(segments.length - 1, 0)].path);
    const service = this.viewService.detemineService(path);
    if (!service) {
      return DetailsGuard.redirectUrl;
    }
    return service.getById(id).pipe(
      map((item) => {
        console.log(item);
        if (item && item.userId === this.authService.userId) {
          return true;
        }
        return DetailsGuard.redirectUrl;
      }),
      catchError(() => of(DetailsGuard.redirectUrl))
    );
  }
}
