/**
 * @authors   Ani Valle and Andrea Morales
 * @file      This component manages the creation of an user.
 *            It connects with a service, which makes the connection with the DB
 */
import { Component} from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ServerServiceService } from 'src/app/services/server-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  //Set variables
  datos!:string;
  miform!:FormGroup;
  message!:string;
  element = false;

  // Call the constructor with the service
  constructor (public router:Router, private myhttp: ServerServiceService) {
    
    // Validations of the registration form
    this.miform = new FormGroup({

      username:new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z1-9]+$')
      ]),
      pass: new FormControl('',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
        Validators.pattern('^[a-zA-Z0-9]+$')
      ]),
      confirm_pass: new FormControl('',[
        Validators.required
      ]),
      name: new FormControl('',[
        Validators.required,
        Validators.pattern('^[a-zA-Z` ]+$')
      ]),
      lastname: new FormControl('',[
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$')
      ]),
      email:new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      tel: new FormControl('',[
        Validators.required,
        Validators.pattern('^[6|7][0-9]{8}$')
      ])
    });

  }

  /**
   * Checks if the data is valid and do the register
   * @returns message depending the response of the server
   */
  testRegister():void {

    this.myhttp.registerUser(this.miform.value).subscribe({
      next:(result: User) => {
        if(result == null){
          this.element = true;
          this.message = 'An error occurred while trying to save the data';
        }else{
          console.log('from testRegister', result);
          this.element = true;
          this.message = 'Register done.';
          
        }
      },
      error:(error) => {
        console.log('error from register', error)
        this.element = true;
        this.message = 'The username or the mobile phone is taken, try another one!';
      }
  })
    
  }

  // ---------------------- Redirects -----------------------//
  /**
   *  This function redirects to the 'resident' page
   */
  redirects(): void{
    this.router.navigateByUrl('/login')
  }

  // ------------------------- Button ---------------------------//
  /**
   * On click do the register
   */
  submit():void {
    this.testRegister();
  }

}
