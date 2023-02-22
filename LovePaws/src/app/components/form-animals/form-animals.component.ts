import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Animal } from 'src/app/models/Animal';
import { AnimalserviceService } from 'src/app/services/animalservice.service';

@Component({
  selector: 'app-form-animals',
  templateUrl: './form-animals.component.html',
  styleUrls: ['./form-animals.component.css']
})
export class FormAnimalsComponent {
  
  formAnimals!:FormGroup;
  message!:string;
  element = false;

  constructor(public router:Router, private myhttp: AnimalserviceService){
  // Validations of the formAnimals
    this.formAnimals = new FormGroup({

      name: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z` ]+$')
      ]),
      specie: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z]+$')
        
      ]),
      breed: new FormControl('',[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z ]+$')

      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.maxLength(2),
        Validators.pattern('^[0-9]+$'),
        Validators.max(30)
      ]),
      sex: new FormControl('',[
        Validators.required,
        Validators.maxLength(1),
        Validators.pattern('F|M|f|m')
      ]),
      neutered: new FormControl('',[
        Validators.required,
        Validators.maxLength(1),
        Validators.pattern('N|Y|n|y')
      ])
    })
  }

  /**
   * Register Animal in database
   */
  registerAnimalDB():void{

    this.myhttp.registerAnimal(this.formAnimals.value).subscribe({
      next:(result: Animal) => {
        if (result == null){
          this.element = true; 
          this.message = 'Error occurred, try again';
        }else{
          console.log('from registerAnimalDb', result);
          this.message = 'Register done!';
          this.element = true;         
        }
      },
      error:(error) => {
        console.log('error from register', error);
        if (error.statusText == "Forbidden"){
          this.element = true; 
          this.message = 'You have no permission to do this!';
        }
        
      }
        
  })
  }

  // ---------------------- Redirects -----------------------//
  /**
   *  This function redirects to the 'resident' page
   */
  redirects(): void{
    this.router.navigateByUrl('/residents')
  }
  
  /**
   * 
   */

  submit():void {
    this.registerAnimalDB();
  }
}
