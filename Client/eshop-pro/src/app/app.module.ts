import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { SliderComponent } from './pages/home/slider/slider.component';
import { SpecialProductsComponent } from './pages/home/special-products/special-products.component';
import { NewProductsComponent } from './pages/home/new-products/new-products.component';
import { FavoriteProductsComponent } from './pages/home/favorite-products/favorite-products.component';
import { LatestnewsComponent } from './pages/home/latestnews/latestnews.component';
import { BrandsComponent } from './pages/home/brands/brands.component';
import { SliderService } from './services/slider.service';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AppRoutingModule } from './app-routing.module';
import { EshopInterceptor } from './Utilities/EshopInterceptor';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ActiveAccountComponent } from './pages/active-account/active-account.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsService } from './services/products.service';
import { SingleProductComponent } from './SharedComponents/single-product/single-product.component';
import { SiteFooterComponent } from './SharedComponents/site-footer/site-footer.component';
import { SiteHeaderComponent } from './SharedComponents/site-header/site-header.component';
import { NgxLoadingModule } from 'ngx-loading';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';









@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    HomeComponent,
    SliderComponent,
    SpecialProductsComponent,
    NewProductsComponent,
    FavoriteProductsComponent,
    LatestnewsComponent,
    BrandsComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    ActiveAccountComponent,
    ProductsComponent,
    SingleProductComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({
     fullScreenBackdrop:true,


    }),
    BrowserAnimationsModule,
    MatSliderModule,









  ],
  providers: [
    SliderService,
    AuthService,
    CookieService,
    ProductsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EshopInterceptor,
      multi: true
    }




  ],
  bootstrap: [AppComponent]
})
export class AppModule {  }
