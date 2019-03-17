import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  mode = 'over';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private breakpointObserver: BreakpointObserver,) { }

  ngOnInit() {
    // this.afAuth = this.authService.getAuth()
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
