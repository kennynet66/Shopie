import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { NewProductComponent } from './components/admin/new-product/new-product.component';
import { CustomersComponent } from './components/admin/customers/customers.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path: 'admin', component: AdminDashboardComponent, children: [
    {path: 'products', component: ProductsComponent},
    {path: 'new-product', component: NewProductComponent},
    {path: 'customers', component: CustomersComponent},
  ]}
];
