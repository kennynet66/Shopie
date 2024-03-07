import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { product } from '../../../Interfaces/products.Interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productsarr: product[] = [];
  tempId!:string;
  tempName!: string;
  confirmAction = false;
  constructor(private dataservice: DataService){
    this.displayProducts();
  }

  displayProducts(){
    this.dataservice.getAllProducts().subscribe(res =>{
      if(res.products){
        res.products.forEach((product:any) =>{ this.productsarr.push(product)})
      }

    })
  }

  deleteProduct(productId:string){
    this.dataservice.deleteProduct(productId).subscribe(res =>{
      if(res.success){
        this.productsarr = [];
        this.tempId='';
        this.tempName = ''
        this.confirmAction = false;
        this.displayProducts()
      }
    })
  }

  confirmDelete(productName: string, productId:string){
    this.tempId = productId
    this.tempName = productName
    this.confirmAction = true
  }

  cancelDelete(){
    this.tempId='';
    this.tempName = ''
    this.confirmAction = false;
  }

    }

