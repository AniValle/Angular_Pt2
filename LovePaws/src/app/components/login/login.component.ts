/**
 * @authors Ani Valle and Andrea Morales
 * @file    This file contains the login management as well as 
 *          the validation of the user's credentials.
 */

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

// Global variables
  message!:string;
  user!:User;
  miformlogin:FormGroup; 
  element = false;

  // Constructor
  constructor(public router:Router, private myhttp: ServerServiceService) {
    
    this.message ="";
    this.user = new User();
    if(this.myhttp.userData()){
      this.router.navigate(['/home']);
    }
    
    // ------------------- Form Login ---------------------// 
    this.miformlogin= new FormGroup({
      // Validation
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

  
/**
 * Login
 * This function calls the function of the service that validates 
 * the credentials to be able to log in and manages error messages
 */
  login():void{

    this.myhttp.validateUsers(this.miformlogin.value).subscribe({
      next: (result: User) => {
        if(result==null){
          this.element = true;
          this.message="Creadentials incorrect, try again!";
        }else{
          console.log(result);
          this.user=JSON.parse(JSON.stringify(result));
          // successfulLogin function redirects to '/home'
          this.router.navigate(['/home']);
        }
      }
    })
  }


  // ------------------------- Button ---------------------------//
  /** Secondary function.
   * Call the function to login
   */
   submit():void{
      this.login();
    }

  }

