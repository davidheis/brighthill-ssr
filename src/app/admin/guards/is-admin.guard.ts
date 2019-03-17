import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { AdminService } from '../../../../src/app/admin/admin.service';

@Injectable({
  providedIn: 'root'
})


export class IsAdminGuard implements CanActivate {


  constructor(
    public authService: AdminService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.user$.pipe(
      take(1),
      map(user => {
        return user && user.isAdmin ? true : false
      }),
      tap(isAdmin => {
        if (!isAdmin) {
          console.error('Access denied - Admins only')
        }
      })
    );


  }
}