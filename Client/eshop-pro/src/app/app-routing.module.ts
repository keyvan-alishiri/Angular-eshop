import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ActiveAccountComponent } from './pages/active-account/active-account.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsComponent } from './pages/products/products.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path : '' ,component:HomeComponent},
  {path : 'contact-us' ,component:ContactUsComponent},
  {path : 'about-us' ,component:AboutUsComponent},
  {path : 'login' ,component:LoginComponent},
  {path : 'register' ,component:RegisterComponent},
  {path: 'activate-account/:activeCode', component: ActiveAccountComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:productId/:productName', component: ProductDetailComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
