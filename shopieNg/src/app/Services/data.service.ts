import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { deleteProductResponse, newProductResponse, product, productsResponse } from '../Interfaces/products.Interface';
import { Categories, category, createCategoryResponse } from '../Interfaces/categories.Inteface';
import { allUsersResponse } from '../Interfaces/user.Interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAllProducts(){
    return this.http.get<productsResponse>('http://localhost:3000/products/all-products')
  }
  getAllCategories(){
    return this.http.get<Categories>('http://localhost:3000/categories/all-categories')
  }
  createProduct(details:product){
    return this.http.post<newProductResponse>('http://localhost:3000/products/new-product', details)
  }
  deleteProduct(productId:string){
    return this.http.delete<deleteProductResponse>(`http://localhost:3000/products/delete/${productId}`)
  }
  createCategory(categoryDetails: category){
    return this.http.post<createCategoryResponse>('http://localhost:3000/categories/new-category', categoryDetails)
  }
  getAllUsers(token: string){
    return this.http.get<allUsersResponse>('http://localhost:3000/user', {
      headers: {
        token
      }
    })
  }
}
