import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AdminService } from '../../../../../src/app/admin/admin.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  afAuth
  mode = 'over';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AdminService
    ) { }

  ngOnInit() {
    this.afAuth = this.authService.afAuth
  }

  logout() {
    this.authService.logout()
      .catch(err => console.log(err));
  }
  
  // loginWithGoogle() {
  //   this.isLoading = true;
  //   this.authService.googleLogin()
  //     .then(x =>
  //       this.isLoading = false
  //     )
  //     .catch(err => console.log(err))
  // }
  // logout() {
  //   this.authService.logout();
  // }
}
