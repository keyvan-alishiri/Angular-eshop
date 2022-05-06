import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUserDTO } from '../models/Account/CurrentUserDTO';
import { ICheckUserAuthResult } from '../models/Account/ICheckUserAuthResult';
import { ILoginUserAccount } from '../models/Account/ILoginUserAccount';
import { LoginUserDTO } from '../models/Account/LoginUserDTO';

import { RegisterUserDTO } from '../models/Account/RegisterUserDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//private currentUser : currentUserDTO;
private currentUser:BehaviorSubject<CurrentUserDTO> = new BehaviorSubject<CurrentUserDTO>(null);
  constructor(private http: HttpClient

    ) { }


    setCurrentUser(user:CurrentUserDTO):void{
      this.currentUser.next(user);
    }

    getCurrentUser():Observable<CurrentUserDTO>{
      return this.currentUser;
    }


  registerUser(registerData: RegisterUserDTO): Observable<any> {
    return this.http.post<any>('/api/account/register', registerData);
  }

  loginUser(loginUserDTO : LoginUserDTO):Observable<ILoginUserAccount>{
    return this.http.post<ILoginUserAccount>('/api/account/login', loginUserDTO);
  }

  checkUserAuth():Observable<ICheckUserAuthResult>{
    return this.http.post<ICheckUserAuthResult>("/api/account/check-auth",null);
  }


  logOutUser():Observable<any>
  {
    return this.http.get('/api/account/sing-out');
  }

  activateUser(emailActiveCode:string):Observable<any>{
    return this.http.get('/api/account/activate-account/' + emailActiveCode)
  }


}
