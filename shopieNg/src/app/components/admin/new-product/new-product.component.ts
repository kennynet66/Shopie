import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../../Services/data.service';
import { category } from '../../../Interfaces/categories.Inteface';
import { product } from '../../../Interfaces/products.Interface';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  createProductForm!: FormGroup;
  categoryarr: category[] = [];
  productsarr: product[] = [];

  constructor(private fb:FormBuilder, private dataservice: DataService){
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
        this.displayProducts()
      }
    })
  }
  categoryDetails(categoryId: string){}
}
