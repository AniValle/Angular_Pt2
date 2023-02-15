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
          this.message = 'Ocurrió un error al intentar guardar los datos';
        }else{
          console.log('from testRegister', result);
          this.message = 'Register done.';
          //this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.log('error from register', error)
      }
    )
    
  }

  // ------------------------- Button ---------------------------//
  submit():void {

    this.testRegister();

    // console.log(this.miform.value);
    // this.datos= `
    // username:     ${this.miform.value.username}
    // pass:         ${this.miform.value.pass}
    // confirm_pass: ${this.miform.value.confirm_pass}
    // name:         ${this.miform.value.name}
    // lastname:     ${this.miform.value.lastname}
    // email:        ${this.miform.value.email}
    // tel:          ${this.miform.value.tel}
    // `
  }

}
