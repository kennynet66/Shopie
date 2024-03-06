import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../Services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private apiservice:ApiService) {}
  getToken(){
    let token = localStorage.getItem('token',) as string;
    if(token){
      return token
    } else {
      return "null"
    }
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.apiservice.checkUserDetails(this.getToken()).pipe(
      map(res => {
        if (res.error) {
          this.router.navigate(['login']);
          return false;
        } else if(res.info.isAdmin) {
          return true;
        }else if(!res.info.isAdmin) {
          this.router.navigate(['login']);
          return false;
        } else {
          return false
        }
      })
    );
  }
}
