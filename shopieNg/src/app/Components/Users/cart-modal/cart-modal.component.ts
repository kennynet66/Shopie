import { Component, OnInit  } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { Product, Rating } from '../../../Interfaces/product.interface'
import { ApiService } from '../../../Services/api.service'

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [ NavbarComponent, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})

export class CartModalComponent  {

  cartItems: [] = []; 

  constructor(private api: ApiService, private router: Router) {}

  

  fetchSingleCart(id :string){
    this.api.getUserCart(id).subscribe(res =>{
      // this.cartItems = 
    })
  }

  getTotalItems(): number {
    return this.cartItems.length;
  }

}
