import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core'
import { SingleProductComponent } from './Components/Users/single-product/single-product.component';
import { CartModalComponent } from './Components/Users/cart-modal/cart-modal.component';
import { NotfoundComponent } from './Components/Users/404/404.component';

export const routes: Routes = [
    {path:'single-product/:id', component: SingleProductComponent},
    {path:'cart-modal', component: CartModalComponent},
    {path:'**', component: NotfoundComponent}, 

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }



