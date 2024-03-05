import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../Interfaces/user.Interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule, CommonModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMsg!:string;
  successMsg!: string;
  errorDiv = false
  successDiv = false
  constructor(private authservice: AuthService, private fb:FormBuilder, private router: Router){
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  displaySuccess(msg:string){
    this.successMsg = msg;
    this.successDiv = true
    setTimeout(() => {
      this.successDiv = false
      this.router.navigate(['/login'])
    }, 2000);
  }

  displayErrors(msg: string){
    this.errorMsg = msg;
    this.errorDiv = true

    setTimeout(() => {
      this.errorDiv = false
    }, 2000);
  }

  registerUser(details: User){
    if(this.registerForm.valid){
      this.authservice.registerUser(details).subscribe(res =>{
        if(res.message){
          this.displaySuccess(res.message)
        }

      })
    }
  }
}
