import { Component, OnInit } from '@angular/core';
import { CurrentUserDTO } from './models/Account/CurrentUserDTO';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'eshop-pro';
  constructor(private authService: AuthService)
  {}

  ngOnInit(): void {
    this.authService.checkUserAuth().subscribe(res => {
      if(res.status == 'Success')
      {
        const user = new CurrentUserDTO(
          res.data.userId,
          res.data.firstName,
          res.data.lastName,
          res.data.address,

        );

        this.authService.setCurrentUser(user);
      }

    });
  }
}
