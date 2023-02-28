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

  datos!:string;
  miform!:FormGroup;
  message!:string;
  element = false;

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
        // se ha de validar con una directiva
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
        //Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]),
      tel: new FormControl('',[
        Validators.required,
        Validators.pattern('^[6|7][0-9]{8}$')
      ])
    });

  }

  testRegister():void {

    this.myhttp.registerUser(this.miform.value).subscribe(
      (result: User) => {
        if(result == null){
          this.element = true;
          this.message = 'An error occurred while trying to save the data';
        }else{
          this.element = true;
          console.log('from testRegister', result);
          this.message = 'Register done.';
          this.element = true;
        }
      },
      (error) => {
        console.log('error from register', error)
        this.message = 'An error occurred while trying to save the data';
        this.element = true;

      }
    )
    
  }

  // ---------------------- Redirects -----------------------//
  /**
   *  This function redirects to the 'resident' page
   */
  redirects(): void{
    this.router.navigateByUrl('/login')
  }

  // ------------------------- Button ---------------------------//
  submit():void {
    this.testRegister();

  }

}
