import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'
import { CartService } from '../../../Services/cart.service';
import { ApiService } from '../../../Services/api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  constructor(private router: Router, private cartService: CartService, private apiservice: ApiService) {
    this.checkAuth()
  }

  isLogged: boolean = false;
  firstName!: string
  lastName!: string

  navigateToHome(){
    this.router.navigate(['/']);
  }

  openCart() {
    this.router.navigate(['/cart-modal']);
  }

  getToken(){
    let token = localStorage.getItem('token',) as string;
    if(token){
      return token
    } else {
      return null
    }
  }
  checkAuth(){
    const token = this.getToken()
    if (token != null) {
      this.apiservice.checkUserDetails(token).subscribe(res =>{
        if(res.info){
          this.isLogged = true
          this.firstName = res.info.firstName
          this.lastName = res.info.lastName
        }
      })
    } else {
      this.isLogged = false
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
}
