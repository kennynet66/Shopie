import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginDetails, loginResponse } from '../Interfaces/login.interface';
import { Observable, of } from 'rxjs';
import { User, userInfoResponse, userResponse } from '../Interfaces/user.Interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  readToken(token:string){
    return this.http.get<userInfoResponse>('http://localhost:4100/auth/checkdetails', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': token
      })
    })
  }

  // Mock user data for demonstration purposes
  currentUser: { id: string, username: string } = { id: "5", username: 'exampleUser' };

  getCurrentUser(token: string){
    return this.http.get<userInfoResponse>('http://localhost:3000/auth/checkdetails', {
      headers: {
        token
      }
    })
  }

  loginUser(details:loginDetails){
    return this.http.post<loginResponse>('http://localhost:3000/auth/login', details)
  }
  registerUser(details:User){
    return this.http.post<userResponse>('http://localhost:3000/user', details)
  }
}
