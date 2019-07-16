import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerForm: FormGroup
  isLoggedIn = 0;

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) {
    this.authService.getProfile().subscribe(res => {
      if(res['success']) {
        this.isLoggedIn = 1;
      }
    })
    this.registerForm = this.fb.group({
      name : ['',[Validators.required]],
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
      'confirm-password': ['',[Validators.required]]  
    })
  }

  ngOnInit() {
  }

  registerUser(){
    this.authService.saveUser(this.registerForm.value)
    .subscribe((res) => {
      if(res['success']) {
        this.registerForm.reset();
        this.toastr.success('Successfully','Registration Done',{timeOut: 2000});
      } else {
        this.toastr.error(res['message'],'Oops',{timeOut: 2000});
      }
    })
  }
}
