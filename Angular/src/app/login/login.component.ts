import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,private toastr: ToastrService) { 
    this.loginForm  = this.fb.group({
      email : ['',[Validators.required]],
      password: ['',[Validators.required]]
    })  
  }

  ngOnInit() {
  }

  login() {
    this.authService.loginAttempt(this.loginForm.value)
    .subscribe((res) => {
      if (res['success']){
        this.authService.saveLoggedInUser(res['token'], res['user']);
        this.toastr.success('successfully', 'Logged in', {
          timeOut: 2000
        });
        setTimeout(() => {
          this.router.navigate(['/my-profile'])
        }, 2000);
      } else {
        this.toastr.error(res['message'], 'Oops!', {
          timeOut: 2000
        });
      }
    })
  }
}
