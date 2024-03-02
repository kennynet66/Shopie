import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { product } from '../../../Interfaces/products.Interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productsarr: product[] = []
  constructor(private dataservice: DataService){
    this.displayProducts();
  }

  displayProducts(){
    this.dataservice.getAllProducts().subscribe(res =>{
      if(res.products){
        res.products.forEach(product =>{ this.productsarr.push(product)})
      }
      
    })
  }
}
