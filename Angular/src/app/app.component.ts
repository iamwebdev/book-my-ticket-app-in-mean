import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookMyTicket';
  isLoggedIn = 0;
  adminFlag = 0;
  constructor(private authService: AuthService,private router: Router){
  }
  
  logoutUser() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  authCheck(){
    this.authService.getProfile().subscribe(res => {
      if(res['success']) {
        this.isLoggedIn = 1;
        if(res['user'].is_admin)
          this.adminFlag = 1
        else
          this.adminFlag = 0  
      } else {
        this.isLoggedIn = 0;
        this.adminFlag = 0;
      }
    })
  }
}
