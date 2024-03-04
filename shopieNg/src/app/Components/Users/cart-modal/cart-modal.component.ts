import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { Product, Rating } from '../../../Interfaces/product.interface'
import { ApiService } from '../../../Services/api.service';
import { CartService } from '../../../Services/cart.service';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterOutlet],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})

export class CartModalComponent  implements OnInit {

  cartItems:  any[] = []; 
  isCartOpen: boolean = false;

  constructor(private api: ApiService, private router: Router, private cartService: CartService ) {  }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
    });

    this.cartService.isCartOpen$.subscribe(isOpen => {
      console.log('Is cart open?', isOpen);
      this.isCartOpen = isOpen;
    });
  }

  fetchSingleCart(id :string){
    console.log(id);
    
    this.api.getUserCart(id).subscribe(
      
      (res: any) => {
        if (res && res.products) {
          const cart = {
            id: res.id,
            userId: res.userId,
            date: res.date,
            products: res.products
          };
  
          console.log('Fetched Single Cart:', cart);
        } else {
          console.error('Invalid response or no products found in the cart:', res);
        }
      },
      (error) => {
        console.error('Error fetching single cart:', error);
      }
    );
  }

  getTotalItems(): number {
    return this.cartItems.length;
  }

  checkout() {
    console.log('Checking out...');
  }

  closeCart() {
    console.log('Closing cart...');
  }

  
}
