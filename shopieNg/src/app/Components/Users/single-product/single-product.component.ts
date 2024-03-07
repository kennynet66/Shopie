import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
// import { Product} from '../../../Interfaces/product.interface';
import { ApiService } from '../../../Services/api.service'
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiResponse } from '../../../Interfaces/apiResponse.interface';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { AuthService } from '../../../Services/auth.service';
import { product } from '../../../Interfaces/products.Interface';
import { ProductCategory} from '../../../Interfaces/productCategory.interface';
import { Product } from '../../../Interfaces/product.interface';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})

export class SingleProductComponent {

  
  productArr: any = []
  errorMessage: string | null = null;
  successMessage: string | null = null;
  quantity: number = 1;

  products: any = []; 
  product: Product | undefined; 
  

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
    this.api.getSingleProduct(id).subscribe(
      (res) => {
        console.log(res);
        
        if (res.products) {
          this.productArr.push(res.products[0]);
          this.fetchProducts(res.products[0].categoryId);
          console.log(res.products[0].categoryId);
          
        } else {
          this.errorMessage = 'Failed to fetch product details. Please try again.';
          console.error('Product not found or an error occurred:', res);
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching product details. Please try again.';
        console.error('Error fetching single product:', error);
      }
    );
  }


  fetchProducts(category: string) {
    console.log('Fetching products by category:', category);
    this.api.getByCategory(category).subscribe(
      (res) => {
        console.log('Response:', res);

        if (res.products) {
          this.products = res.products.slice(0, 6);
          console.log('Similar Products:', this.products);
        } else {
          this.errorMessage = 'Unexpected response structure.';
          console.error('Unexpected response structure:', res);
        }
      },
      (error) => {
        this.errorMessage = 'Error fetching similar products. Please try again.';
        console.error('Error fetching products:', error);
      }
  );
}

showSimilarProducts(categoryId: string) {
  this.fetchProducts(categoryId);
}

clearMessagesAfterTimeout(): void {
  setTimeout(() => {
    this.errorMessage = null;
    this.successMessage = null;
  }, 2000);
}

decrementQuantity() {
  if (this.quantity > 1) {
    this.quantity--;
  }
}

incrementQuantity() {
  this.quantity++;
}

addToCart(product: any) {
  this.authService.getCurrentUser().subscribe(
    (user) => {
      const productDetails = {
        userId: user.id,
        date: new Date().toISOString(),
        products: [{ productId: product.productId, productName: product.productName, productImage: product.productImage, productPrice: product.productPrice, quantity: this.quantity}]
      };

      this.api.addProductToCart(user.id, productDetails).subscribe(
        (response) => {
          this.successMessage = 'Product added to cart successfully.';
          console.log('Product added to cart:', response);
          this.cartService.addToCart(product);
        },
        (error) => {
          if (error.status === 400 && error.error.error === 'Product already exists in the cart.') {
            this.errorMessage = 'Product already exists in the cart.';
          } else {
            this.errorMessage = 'Failed to add product to cart. Please try again.';
            console.error('Error adding product to cart:', error);
          }
          setTimeout(() => {
            this.errorMessage = null;
            this.successMessage= null;
          }, 2000);
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
          this.productArr=[]
          this.fetchSingleProduct(productId)
          
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
