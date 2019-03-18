import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../../src/app/admin/admin.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AdminService,
    private router: Router,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  loginWithGoogle() {
    // this.isLoading = true;
    
    this.authService.googleLogin()
    .then(() => {
      this.router.navigate([""]);
      this.flashMessagesService.show("Logged in", {
            cssClass: "alert-success",
            timeout: 6000
          });
    }
      
      // How do I navigate away from login after success?
      // () => this.router.navigate([`articles`])
    )
        .catch(err => {
          console.log(err)
             alert('err29')
          // this.flashMessagesService.show("Permission denied see console", {
          //   cssClass: "alert-danger",
          //   timeout: 6000
          // });
        }
           
           )
  }
  logout() {
    this.authService.logout()
      .catch(err => console.log(err));
  }

}
