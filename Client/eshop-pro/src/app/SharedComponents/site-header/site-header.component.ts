import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CurrentUserDTO } from 'src/app/models/Account/CurrentUserDTO';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {
user: CurrentUserDTO = null;

  constructor(private authService: AuthService,private cookieService:CookieService, private router:Router) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe( user => {
      this.user = user;

    });
  }

  logOutUser(){
    // this.authService.logOutUser().subscribe( res => {
    //   if(res.status === 'Success')
    //   {
    //     console.log('User Is Logout');

    //   }

    // });
    this.cookieService.delete('eshop-cookie');
    this.authService.setCurrentUser(null);
    this.router.navigate(['/']);
  }

}
