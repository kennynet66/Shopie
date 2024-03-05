import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../Interfaces/product.interface';
import { Observable } from 'rxjs';
import { productsResponse } from '../Interfaces/products.Interface';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  token = localStorage.getItem('token') as string
  constructor(private http:HttpClient) { }




  ///products api and category service
  getProducts(){
    return this.http.get<{products:Product[], error: string}>('http://localhost:3000/products/all-products',{
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }

  getSingleProduct(id:string){
    return this.http.get <productsResponse>(`https://fakestoreapi.com/products/${id}`,{
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }

  getAllCategories(){
    return this.http.get<{product:Product, error: string}>(`https://fakestoreapi.com/products/categories`,{
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }

  getByCategory(category :string){
    return this.http.get<Product[]>(`https://fakestoreapi.com/products/category/${category}`,{
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }

  //cart services

  getUserCart(userId: string){
    return this.http.get<{cart: any[], error: string}>(`http://localhost:3000/cart/${userId}`,{
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }

  getAllUsersCart(){
    return this.http.get<{product:Product, error: string}>(`https://fakestoreapi.com/carts/`,{
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }

  addProductToCart(userId: any, productDetails: any): Observable<{ product: Product, error: string }>{
    return this.http.post<{product:Product, error: string}>('http://localhost:3000/cart', productDetails, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }

  deleteCart(id: string){
    return this.http.post<{product:Product, error: string}>(`https://fakestoreapi.com/carts/user/${id}`,{
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }
}
