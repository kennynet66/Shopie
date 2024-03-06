import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../Services/data.service';
import { category } from '../../../Interfaces/categories.Inteface';
import { ApiService } from '../../../Services/api.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  productId!: string;
  categoryarr: category[] = [];
  updateProductForm!: FormGroup;

  successMsg!: string;
  errorMsg!: string

  errorDiv = false;
  successDiv = false

  constructor(private route: ActivatedRoute, private dataservice: DataService, private fb: FormBuilder, private apiservice: ApiService, private router: Router) {
    this.updateProductForm = this.fb.group({
      productName: ['', [Validators.required]],
      descr: ['', [Validators.required]],
      productQuantity: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      productImage: ['', [Validators.required]],
      productCategory: ['', [Validators.required]],
    })
    this.getProductId();
    this.getCategories();
  }
  displaySuccess(msg:string, route: string){
    this.successMsg = msg;
          this.successDiv = true;
          this.updateProductForm.reset();
    setTimeout(() => {
      this.router.navigate([route])
      this.successDiv = false
    }, 2000);
  }

  displayErrors(msg: string){
    this.errorMsg = msg;
    this.errorDiv = true

    setTimeout(() => {
      this.errorDiv = false
    }, 2000);
  }
  getProductId() {
    this.route.params.subscribe((params) => {
      this.productId = params['productId'];
      this.getProductDetails();
    })
  }
  getCategories() {
    this.dataservice.getAllCategories().subscribe(res => {
      if (res.categories) {
        res.categories.forEach(category => { this.categoryarr.push(category) });
      }
    })
  }

  getProductDetails() {
    this.apiservice.getSingleProduct(this.productId).subscribe(res => {
      this.updateProductForm.patchValue({
        productName: res.products[0].productName,
        descr: res.products[0].descr,
        productQuantity: res.products[0].productQuantity,
        productPrice: res.products[0].productPrice,
        productImage: res.products[0].productImage
      })
    })
  }

  updateProduct(){
    this.apiservice.updateProduct(this.updateProductForm.value, this.productId).subscribe(res => {
      if(res.success){
        this.displaySuccess(res.success, '/admin/products')
      } else if(res.error){
        this.displayErrors(res.error)
      }
    })
  }
}
