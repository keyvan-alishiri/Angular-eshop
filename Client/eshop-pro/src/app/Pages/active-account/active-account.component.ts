import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.scss']
})
export class ActiveAccountComponent implements OnInit {

  isLoading:boolean = true;
  constructor(
    private activatedRout: ActivatedRoute,
    private authService:AuthService,
    private router:Router,
    ) { }

  ngOnInit(): void {
    // console.log(this.activatedRout.snapshot.params);
    this.authService.activateUser(this.activatedRout.snapshot.params.activeCode).subscribe( res => {
      if(res.status === 'Success'){
        this.isLoading = false;
        this.router.navigate(['login']);
      }

    });



  }

}
