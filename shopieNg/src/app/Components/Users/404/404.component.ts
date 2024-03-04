import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './404.component.html',
  styleUrl: './404.component.css'
})
export class NotfoundComponent{

}
