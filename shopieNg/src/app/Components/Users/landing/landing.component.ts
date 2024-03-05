import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Product } from '../../../Interfaces/product.interface';
import { ApiService } from '../../../Services/api.service';
import { ProductCategory} from '../../../Interfaces/productCategory.interface';
import { ApiResponse } from '../../../Interfaces/apiResponse.interface';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink, RouterOutlet, CartModalComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent implements OnInit {

  products: ProductCategory[] = [];
  product: Product | undefined;  
  

  constructor(private api: ApiService, private router: Router){}

  ngOnInit(){
    this.fetchProducts();
  }

  fetchProducts() {
    this.api.getProducts().subscribe(
      (res: { products: Product[] }) => {
        if (res && Array.isArray(res.products)) {
          const productsByCategory: ProductCategory[] = [];

          res.products.forEach((product: Product) => {
            const categoryIndex = productsByCategory.findIndex(
              (category) => category.products.length > 0 && category.products[0].productCategory === product.productCategory
            );

            if (categoryIndex !== -1) {
              productsByCategory[categoryIndex].products.push(product);
            } else {
              productsByCategory.push({ category: product.productCategory, products: [product] });
            }
          });

          this.products = productsByCategory;
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
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
