import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../../src/app/admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AdminService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  loginWithGoogle() {
    // this.isLoading = true;
    this.authService.googleLogin()
    .then(
      // How do I navigate away from login after success?
      // () => this.router.navigate([`articles`])
    )
        .catch(err => console.log(err))
  }
  logout() {
    this.authService.logout()
      .catch(err => console.log(err));
  }

}
