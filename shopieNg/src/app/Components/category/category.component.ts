import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../Services/data.service';
import { category } from '../../Interfaces/categories.Inteface';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  createCategoryForm!: FormGroup;
  errorMsg!: string;
  successMsg!:string;

  successDiv = false;
  errorDiv = false;

  constructor(private fb: FormBuilder, private dataservice: DataService){
    this.createCategoryForm = this.fb.group({
      categoryName: ['', [Validators.required]],
      categoryImage: ['', [Validators.required]]
    })
  }
  displaySuccess(msg:string){
    this.successMsg = msg;
          this.successDiv = true
          this.createCategoryForm.reset();
    setTimeout(() => {
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

  createCategory(categoryDetails: category){
    if(this.createCategoryForm.valid){
      this.dataservice.createCategory(categoryDetails).subscribe(res =>{
        if(res.success){
          this.displaySuccess(res.success)
        } else if(res.error){
          this.displayErrors(res.error)
        }
      })
    }
  }
}
