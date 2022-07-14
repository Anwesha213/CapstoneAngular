import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { SignupComponent } from './components/signup/signup.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentDetailFormComponent } from './payment-details/payment-detail-form/payment-detail-form.component';

const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'products', component:ProductsComponent},
  {path:'login', component:LoginComponent},
  {path:'cart', component:CartComponent},
  {path:'signup', component:SignupComponent},
  {path:'checkout', component:CheckoutComponent},
  {path:'orderdetails',component:OrderdetailsComponent},
  {path:'footer',component:FooterComponent},
  {path:'payment-details',component:PaymentDetailsComponent},
  {path:'payment-detail-form',component:PaymentDetailFormComponent},
  {path:'',redirectTo:'cart', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
