import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core'
import { SingleProductComponent } from './Components/Users/single-product/single-product.component';
import { CartModalComponent } from './Components/Users/cart-modal/cart-modal.component';

export const routes: Routes = [
    {path:'single-product', component: SingleProductComponent},
    {path:'cart-modal', component: CartModalComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }



