import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CurrentUserDTO } from 'src/app/models/Account/CurrentUserDTO';
import { LoginUserDTO } from 'src/app/models/Account/LoginUserDTO';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private authService :AuthService, private router:Router,private cookieService : CookieService) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl(
        null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]
      ),
      password: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
    });
  }


  confirmBox(message: string){
    Swal.fire({
      text: message ,
      title: 'اخطار!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'تایید',
      cancelButtonText: 'لغو'
    });}

  submitLoginForm(){
    console.log(this.loginForm);

    if(this.loginForm.valid)
    {
      const loginData = new LoginUserDTO(

        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value,
        );


        this.authService.loginUser(loginData).subscribe( res => {
          const currentUser = new CurrentUserDTO(
            res.data.userId,
            res.data.firstName,
            res.data.lastName,
            res.data.address
          );
          if(res.status === "Success")
          {
            this.cookieService.set('eshop-cookie',res.data.token,res.data.expireTime * 60);
            this.authService.setCurrentUser(currentUser);
            this.loginForm.reset();
            this.router.navigate(['/']);

          }
          else
          {
            this.confirmBox(res.data.message);

          }




        });
    }


  }

}
