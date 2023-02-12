
import { Component} from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  datos!:string;

  // Validations of the registration form
  miform = new FormGroup({

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


  // ------------------------- Button ---------------------------//
  submit():void {
    console.log(this.miform.value);
    this.datos= `
    username:     ${this.miform.value.username}
    pass:         ${this.miform.value.pass}
    confirm_pass: ${this.miform.value.confirm_pass}
    name:         ${this.miform.value.name}
    lastname:     ${this.miform.value.lastname}
    email:        ${this.miform.value.email}
    tel:          ${this.miform.value.tel}
    `
  }

}
