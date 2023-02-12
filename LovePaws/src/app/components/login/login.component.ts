import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public router:Router) {
  }

  // ------------------- Form Login ---------------------// 
  datos!:string;
   miformlogin = new FormGroup({
 
     username:new FormControl('',[
       Validators.required,
       Validators.minLength(6),
      Validators.maxLength(15),
     ]),
     pass:new FormControl('',[
       Validators.required,
       Validators.minLength(8),
      Validators.maxLength(10),
     ])
   })

  // ---------------------- Redirects -----------------------//
  /**
   * successfulLogin function redirects to '/events'
   */
  successfulLogin(): void{
    this.router.navigateByUrl('/residents')
  }
  successfulLogin2(): void{
    this.router.navigateByUrl('/users')
  }


  // ------------------------- Button ---------------------------//
   submit():void{
    //this.successfulLogin();
    this.successfulLogin2();

      this.datos= `
      Datos ingresados,
      Username:         ${this.miformlogin.value.username}
      Password:         ${this.miformlogin.value.pass}`
        }

  }

