import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  private isCartOpenSubject = new BehaviorSubject<boolean>(false);
  isCartOpen$ = this.isCartOpenSubject.asObservable();

  constructor() { }

  addToCart(product: any) {
    const currentCart = this.cartSubject.value;
    const existingProduct = currentCart.find(item => item.productId === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      currentCart.push({ productId: product.id, quantity: 1 });
    }

    this.cartSubject.next([...currentCart]);
  }

  openCart() {
    console.log('Opening cart...');
    this.isCartOpenSubject.next(true);
  }

  closeCart() {
    console.log('Closing cart...');
    this.isCartOpenSubject.next(false);
  }
}
