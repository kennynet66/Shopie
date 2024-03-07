import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { loginDetails } from '../../Interfaces/login.interface';
import { AuthService } from '../../Services/auth.service';
import { ApiService } from '../../Services/api.service';

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

  storeToken(token: string){
    localStorage.setItem('token', token)
  }

  displaySuccess(msg:string, route:string, token: string){
    this.successMsg = msg;
          this.storeToken(token)
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


  constructor(private fb: FormBuilder, private authservice: AuthService, private router: Router, private apservice: ApiService){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  loginUser(details: loginDetails){
    if(this.loginForm.valid){
      this.authservice.loginUser(details).subscribe(response =>{
        console.log(response);
        if(response.message){
          this.apservice.checkUserDetails(response.token).subscribe(res =>{
            if (res.info.isAdmin){
              this.displaySuccess(response.message, 'admin/products', response.token);
            }
            else if(!res.info.isAdmin){
              this.displaySuccess(response.message, '', response.token)
            } else if(response.error){
              this.displayErrors(response.error)
            }
          })
        }
      })
    } else {
      this.displayErrors('Please fill in all the fields')

    }
  }
}
