import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { loginDetails } from '../../Interfaces/login.interface';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMsg!:string;
  successMsg!: string;
  errorDiv = false
  successDiv = false

  displaySuccess(msg:string, route:string){
    this.successMsg = msg;
    this.successDiv = true
    setTimeout(() => {
      this.successDiv = false
      this.router.navigate([`${route}`])
    }, 2000);
  }

  displayErrors(msg: string){
    this.errorMsg = msg;
    this.errorDiv = true

    setTimeout(() => {
      this.errorDiv = false
    }, 2000);
  }


  constructor(private fb: FormBuilder, private authservice: AuthService, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  loginUser(details: loginDetails){
    if(this.loginForm.valid){
      this.authservice.loginUser(details).subscribe(res =>{
        console.log("called");
        if(res.message && res.isAdmin){
          this.displaySuccess(res.message, 'admin/products')
        } else if(res.message && !res.isAdmin){
          this.displaySuccess(res.message, '')
        } else if(res.error){
          this.displayErrors(res.error)
        }
      })
    } else {
  console.log("Invalid form");

    }
  }
}
