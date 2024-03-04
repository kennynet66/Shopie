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
          this.router.navigate(['admin'])
        } else if(res.message && !res.isAdmin){
          this.router.navigate([''])
        } else if(res.error){
          console.log(res.error);
          
        }
      })
    } else {
  console.log("Invalid form");
        
    }
  }
}
