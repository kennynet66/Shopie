import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'
import { CartService } from '../../../Services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  constructor(private router: Router, private cartService: CartService) {} 

  navigateToHome(){
    this.router.navigate(['/']);
  }

  openCart() {
    this.router.navigate(['/cart-modal']);
  }
  
}
