import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Product, Rating } from '../../../Interfaces/product.interface';
import { ApiService } from '../../../Services/api.service'
import { Router, RouterLink } from '@angular/router';

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

  constructor(private api: ApiService, private router: Router){}

  ngOnInit(){
    localStorage.setItem('productId', 'yourProductId');
    // this.fetchSingleProduct(productId);
    // this.fetchProducts();      
  }

  fetchSingleProduct(id: string){
    this.api.getSingleProduct(id).subscribe(res =>{
      console.log(res);
      this.product = res.product
      console.log(this.product);
    })
  }

  fetchProducts(){
    this.api.getProducts().subscribe(
        (res: Product[] | any) => {
          console.log('Response:', res);
  
          if (Array.isArray(res)) {
            this.products = res.slice(0, 6);
            console.log('Products:', this.products);
          } else {
            console.error('Unexpected response structure:', res);
          }
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
  }

}
