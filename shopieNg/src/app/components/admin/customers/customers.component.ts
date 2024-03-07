import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { User, userArr } from '../../../Interfaces/user.Interface';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  userArr: userArr[] = [];
  constructor(private dataservice: DataService){
    this.getAllUsers();
  };
  getToken(){
    let token = localStorage.getItem('token',) as string;
    if(token){
      return token
    } else {
      return 'null'
    }
  }
  getAllUsers(){
    let token = this.getToken();
    this.dataservice.getAllUsers(token).subscribe(res =>{
      console.log(res);
      if(res.users){
        res.users.forEach(user => {this.userArr.push(user)})
      }
    })
  }
}
