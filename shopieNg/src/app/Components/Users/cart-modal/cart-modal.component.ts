import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { Product, Rating } from '../../../Interfaces/product.interface'
import { ApiService } from '../../../Services/api.service';
import { CartService } from '../../../Services/cart.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterOutlet, NavbarComponent],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})

export class CartModalComponent  implements OnInit {

  cartItems:  any[] = []; 
  isCartOpen: boolean = false;

  constructor(private api: ApiService, private router: Router, private cartService: CartService, private authService: AuthService ) {  }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
    });

    this.cartService.isCartOpen$.subscribe(isOpen => {
      console.log('Is cart open?', isOpen);
      this.isCartOpen = isOpen;
    });

    this.authService.getCurrentUser().subscribe(user => {
      // Assuming user object has 'id' property
      const userId = user.id;
      
      // Call fetchSingleCart with the userId
      this.fetchSingleCart(userId);
    });
  }

  fetchSingleCart(userId: string) {
    console.log(userId);
    
    this.api.getUserCart(userId).subscribe(
      (res) => {
        console.log('API Response:', res);
  
        if (res && res.cart && res.cart.length > 0) {
          console.log('Fetched Single Cart:', res.cart[0]);
          const productsArray = JSON.parse(res.cart[0].products);
          this.cartItems = productsArray
        } else {
          console.error('Invalid response or no cart found:', res);
        }
      },
      (error) => {
        console.error('Error fetching single cart:', error);
      },
      () => {
        console.log('Fetch operation completed.');
      }
    );
  }
  

  getTotalItems(): number {
    return this.cartItems.reduce((total, cart) => total + cart.products.length, 0);
  }

  checkout() {
    console.log('Checking out...');
  }

  closeCart() {
    console.log('Closing cart...');
  }

  
}
