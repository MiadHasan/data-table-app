import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent} ,
  { path: 'products', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products/create', component: ProductFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
