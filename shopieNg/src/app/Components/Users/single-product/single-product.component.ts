import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Product, Rating } from '../../../Interfaces/product.interface';
import { ApiService } from '../../../Services/api.service'
import { Router, RouterLink } from '@angular/router';
import { ApiResponse } from '../../../Interfaces/apiResponse.interface';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})

export class SingleProductComponent {

  products: Product[]=[]
  product: Product | null = null

  constructor(private api: ApiService, private router: Router,  private route: ActivatedRoute, private cartService: CartService,  private authService: AuthService){}

  ngOnInit(){      
    const productId = this.route.snapshot.paramMap.get('id');

  if (productId) {
    this.fetchSingleProduct(productId);
  } else {
    console.error('Product ID not provided.');
  }
  }

  fetchSingleProduct(id: string): void { 
    
    this.api.getSingleProduct(id).subscribe(res => {
        
        if (res !== undefined)  {
          this.product = {
            id: res.id,
            title: res.title, 
            price: res.price,
            description: res.description,
            category: res.category,
            image: res.image,
            rating: res.rating
          };

          this.fetchProducts(this.product.category);
        } else {
          console.error('Product not found or an error occurred:', res);
        }
      })
  }

fetchProducts(category: string) {
  console.log('Fetching products by category:', category);
  this.api.getByCategory(category).subscribe(
    (res: Product[] | any) => {
      console.log('Response:', res);

      if (Array.isArray(res)) {
        this.products = res.slice(0, 6);
        console.log('Similar Products:', this.products);
      } else {
        console.error('Unexpected response structure:', res);
      }
    },
    // (error) => {
    //   console.error('Error fetching products:', error);
    // }
  );
}

showSimilarProducts(categoryId: string) {
  this.fetchProducts(categoryId);
}

addToCart(product: any) {
  this.authService.getCurrentUser().subscribe(
    (user) => {
      const productDetails = {
        userId: user.id,
        date: new Date().toISOString(),
        products: [{ productId: product.id, quantity: 1 }]
      };

      this.api.addProductToCart(user.id, productDetails).subscribe(
        (response) => {
          console.log('Product added to cart:', response);
          // You may want to update the UI or perform additional actions here
          this.cartService.addToCart(product);
        },
        (error) => {
          console.error('Error adding product to cart:', error);
          // Handle the error as needed
        }
      );
    }
  );
}

navigateToSingleProduct(productId: string): void {
  console.log('Product ID:', productId);

  this.api.getSingleProduct(productId).subscribe(
    (res: any) => {
      console.log('Full API Response:', res);
  
      if (res) {
        this.product = res;
        console.log('Product Details:', this.product);
        this.router.navigate(['/single-product', productId]);
      } else {
        console.error('Product not found or an error occurred:', res.error);
      }
    },
    (error) => {
      console.error('Error fetching single product:', error);
    }
  ); 
}

}
