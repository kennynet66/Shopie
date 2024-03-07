import { Component } from '@angular/core';
import { Router,  RouterLink, RouterOutlet  } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [ RouterLink, RouterOutlet ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {

  constructor(private router: Router){}

  logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
}
