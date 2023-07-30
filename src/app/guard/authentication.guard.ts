import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, filter, map, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanLoad {

  constructor( private auth: AuthenticationService,
               private router: Router) {
                this.auth.checkToken();
               }

  canLoad(): Observable<boolean> {
    return this.auth.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        if(isAuthenticated) {
          return true
        }else{
          this.router.navigateByUrl('/home')
          return false
        }
      })
    )
  }
}
