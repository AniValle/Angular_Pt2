import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  message!:string;
  formContact = new FormGroup({ 
    name: new FormControl('',[
      Validators.required,
      Validators.pattern('^[a-zA-Z` ]+$')
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")
    ]),
    // comment: new FormControl('',[
    //   Validators.required,
    //   Validators.maxLength(30)
    // ])
  })

  // ------------------------- Button ---------------------------//
  submit():void {
    this.message = "We have received your comment, we will contact you shortly"
  }

}
