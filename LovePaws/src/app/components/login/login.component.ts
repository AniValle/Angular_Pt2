import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ServerServiceService } from 'src/app/services/server-service.service';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  message!:string;
  user!:User;
  datos!:string;
  miformlogin:FormGroup; 

  constructor(public router:Router, private myhttp: ServerServiceService) {

    this.message ="";
    this.user = new User();
    if(this.myhttp.userData()){
      this.router.navigate(['/home']);
    }
    
  // ------------------- Form Login ---------------------// 
    this.miformlogin= new FormGroup({
 
      username: new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
      ]),
      password: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(10),
      ])
    })
  }

  

  testLogin():void{

    this.myhttp.validateUsers(this.miformlogin.value).subscribe(
      result => {
        if(result==null){
          this.message="Creadentials incorrect, try again!";
        }else{
          
          this.user=JSON.parse(JSON.stringify(result));
          this.router.navigate(['/home']);
        }
      }
    )
  }


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
    //this.successfulLogin2();
      this.testLogin();
      this.datos= `
      Datos ingresados,
      Username:         ${this.miformlogin.value.username}
      Password:         ${this.miformlogin.value.password}`
      }


  }

