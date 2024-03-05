import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginDetails, loginResponse } from '../Interfaces/login.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  readToken(token:string){
    return this.http.get<{info:{userId:string, firstName:string, lastName:string, email: string}}>('http://localhost:4100/auth/checkdetails', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': token
      })
    })
  }

  // Mock user data for demonstration purposes
  currentUser: { id: string, username: string } = { id: "5", username: 'exampleUser' };

  getCurrentUser(): Observable<{ id: string, username: string }> {
    return of(this.currentUser);
  }

  loginUser(details:loginDetails){
    return this.http.post<loginResponse>('http://localhost:3000/auth/login', details)
  }
}
