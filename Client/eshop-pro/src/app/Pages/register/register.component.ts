import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterUserDTO } from 'src/app/models/Account/RegisterUserDTO';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm:FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup( {
      'email': new FormControl(null,[Validators.email,Validators.required,Validators.maxLength(100)]),
      'firstName': new FormControl(null,[Validators.required,Validators.maxLength(100)]),
      'lastName': new FormControl(null,[Validators.required,Validators.maxLength(100)]),
      'password': new FormControl(null,[Validators.required,Validators.maxLength(100)]),
      'confirmPassword': new FormControl(null,[Validators.required,Validators.maxLength(100)]),
      'address': new FormControl(null,[Validators.required,Validators.maxLength(500)]),
    });
  }

  submitRegisterForm()
  {
    const registerData = new RegisterUserDTO(
      this.registerForm.controls.email.value,
      this.registerForm.controls.firstName.value,
      this.registerForm.controls.lastName.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.confirmPassword.value,
      this.registerForm.controls.address.value,
      );



      this.authService.registerUser(registerData).subscribe(res => {
        console.log(res);
        if (res.status === 'Success') {
          this.registerForm.reset();
        }

        if(res.status === 'Error'){
          if(res.data.info === 'EmailExist'){
            this.confirmBox();
          }

        }

      });
  }

  confirmBox(){
    Swal.fire({
      text: ' ایمیل وارد شده'+ this.registerForm.controls.email.value+'تکراری می باشد ',
      title: 'اخطار!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'تایید',
      cancelButtonText: 'لغو'
    });

}
}
