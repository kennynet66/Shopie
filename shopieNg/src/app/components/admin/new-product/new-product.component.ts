import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../../Services/data.service';
import { category } from '../../../Interfaces/categories.Inteface';
import { product } from '../../../Interfaces/products.Interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, RouterLink ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  createProductForm!: FormGroup;
  categoryarr: category[] = [];
  productsarr: any = [];
  value:string ='Save';
  tempId!:string
  tempName!: string
  confirmAction = false

  constructor(private fb:FormBuilder, private dataservice: DataService, private router: Router){
    this.createProductForm = this.fb.group({
      productName: ['', [Validators.required]],
      descr: ['', [Validators.required]],
      productQuantity: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      productImage: ['', [Validators.required]],
      productCategory: ['', [Validators.required]],
    })
    this.getCategories();
    this.displayProducts()
  }

  createProduct(details:product){
    if(this.createProductForm.valid){
      this.dataservice.createProduct(details).subscribe(res=>{
        console.log(res);

        if(res.success) {
          this.productsarr = [];
          this.createProductForm.reset()
          this.displayProducts();
        }
      })
    }
  }

  getCategories(){
    this.dataservice.getAllCategories().subscribe(res =>{
      if(res.categories){
        res.categories.forEach(category =>{this.categoryarr.push(category)});
      }
    })
  }
  displayProducts(){
    this.dataservice.getAllProducts().subscribe(res =>{
      if(res.products){
        res.products.forEach(product =>{ this.productsarr.push(product)})
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
