import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { DomainName } from "./PathTools";

@Injectable({providedIn:'root'})
export  class EshopInterceptor implements HttpInterceptor{

  constructor(private cookieService:CookieService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('eshop-cookie');


    // let myRequest: HttpRequest<any> = req;
    const myRequest = req.clone({
      url:DomainName + req.url,
      headers :req.headers.append('Authorization','Bearer ' + token)
    });

    return next.handle(myRequest)

  }
}
