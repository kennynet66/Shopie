import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product, Rating } from '../Interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  token = localStorage.getItem('token') as string
  constructor(private http:HttpClient) { }




  ///products api and category service
  getProducts(){
    return this.http.get<{products:Product[], error: string}>('https://fakestoreapi.com/products',{
      headers: new HttpHeaders({
        'Content-type': 'application.json'
      })
    })
  }

  getSingleProduct(id:string){
    return this.http.get<{product:Product, error: string}>('https://fakestoreapi.com/products/:id',{
      headers: new HttpHeaders({
        'Content-type': 'application.json'
      })
    })
  }

  getAllCategories(){
    return this.http.get<{product:Product, error: string}>('https://fakestoreapi.com/products/categories',{
      headers: new HttpHeaders({
        'Content-type': 'application.json'
      })
    })
  }

  getByCategory(id:string){
    return this.http.get<{product:Product, error: string}>('https://fakestoreapi.com/products/category/:id',{
      headers: new HttpHeaders({
        'Content-type': 'application.json'
      })
    })
  }

  //cart services

  getUserCart(id: string){
    return this.http.get<{product:Product, error: string}>('https://fakestoreapi.com/carts/user/:id',{
      headers: new HttpHeaders({
        'Content-type': 'application.json'
      })
    })
  }

  addProductToCut(){
    return this.http.post<{product:Product, error: string}>('https://fakestoreapi.com/carts',{
      headers: new HttpHeaders({
        'Content-type': 'application.json'
      })
    })
  }

  deleteCart(id: string){
    return this.http.post<{product:Product, error: string}>('https://fakestoreapi.com/carts/user/:id',{
      headers: new HttpHeaders({
        'Content-type': 'application.json'
      })
    })
  }
}
