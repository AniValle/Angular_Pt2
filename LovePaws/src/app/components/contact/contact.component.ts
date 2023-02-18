import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  element = false;
  message!:string;
  formContact!:FormGroup;

  constructor(public router:Router) {

    this.formContact = new FormGroup({ 
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z` ]+$')
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")
      ]),
      comment: new FormControl('',[
        Validators.required,
        Validators.maxLength(30)
      ])
    })
    
  }


  // ------------------------- Button ---------------------------//
  submit():void {
    this.element = true;
    this.message = "We have received your comment, we will contact you shortly";
  }

  sendHome():void{
    this.router.navigateByUrl('/home')
  }

}
