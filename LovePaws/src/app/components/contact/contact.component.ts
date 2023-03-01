/**
 * @authors Ani Valle and Andrea Morales
 * @file    This file contains the contact form with its validations and error management.
 */

import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  // Global variables
  element = false;
  message!:string;
  formContact!:FormGroup;

  //Constructor
  constructor(public router:Router) {

    // Initialize contact form and validate inputs.
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
  // Show Message
  submit():void {
    this.element = true;
    this.message = "We have received your comment, we will contact you shortly";
  }

  // Redirect to home page.
  sendHome():void{
    this.router.navigateByUrl('/home')
  }

}
