import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core'
import { CartModalComponent } from './Components/Users/cart-modal/cart-modal.component';
import { NotfoundComponent } from './Components/Users/404/404.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { LandingComponent } from './Components/Users/landing/landing.component';
import { SingleProductComponent } from './Components/Users/single-product/single-product.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { ProductsComponent } from './Components/Admin/products/products.component';
import { NewProductComponent } from './Components/Admin/new-product/new-product.component';
import { CustomersComponent } from './Components/Admin/customers/customers.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'single-product/:id', component: SingleProductComponent},
  { path: 'cart-modal', component: CartModalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin', component: AdminDashboardComponent, children: [
      { path: 'products', component: ProductsComponent },
      { path: 'new-product', component: NewProductComponent },
      { path: 'customers', component: CustomersComponent },
    ]
  },
  { path: '**', component: NotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



