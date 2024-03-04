import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from './Components/Users/landing/landing.component';
// import { NavbarComponent } from './components/Users/navbar/navbar.component';
// import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LandingComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'shopieNg';
}
