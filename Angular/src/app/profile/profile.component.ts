import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public name;
  watchedMovies:any = []
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe((res) => {
      if(res['success']) {
        this.name = res['user'].name
      } else {
        this.router.navigate(['/login']);
      }
    })

    this.authService.getWatchedHistory().subscribe((res) => {
      this.watchedMovies = res;
      console.log(this.watchedMovies)
    })
  }

}
