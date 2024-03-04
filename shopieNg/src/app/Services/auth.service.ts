import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginDetails } from '../Interfaces/login.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  loginUser(user_details:loginDetails ){
    return this.http.post<{message:string, token:string, error:string}>('http://localhost:4100/auth/login', user_details)
  }

  readToken(token:string){
    return this.http.get<{info:{userId:string, firstName:string, lastName:string, email: string}}>('http://localhost:4100/auth/checkdetails', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': token
      })
    })
  }

  // Mock user data for demonstration purposes
  currentUser: { id: number, username: string } = { id: 5, username: 'exampleUser' };

  getCurrentUser(): Observable<{ id: number, username: string }> {
    return of(this.currentUser);
  }
}
