import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common'
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { Product, Rating } from '../../../Interfaces/product.interface'
import { ApiService } from '../../../Services/api.service'

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent implements OnInit {

  products: Product[]=[]

  constructor(private api: ApiService, private router: Router){}

  ngOnInit(){
    this.fetchProducts();
  }


  fetchProducts() {
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


  navigateToSingleProduct(productId: number): void {
    const productIdString = localStorage.getItem('selectedProductId');
    this.router.navigate(['/single-product']);
  }
  

}
