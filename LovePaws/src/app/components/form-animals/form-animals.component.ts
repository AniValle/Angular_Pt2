import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Animal } from 'src/app/models/Animal';
import { ServerServiceService } from 'src/app/services/server-service.service';

@Component({
  selector: 'app-form-animals',
  templateUrl: './form-animals.component.html',
  styleUrls: ['./form-animals.component.css']
})
export class FormAnimalsComponent {
  
  formAnimals!:FormGroup;
  message!:string;

  constructor(public router:Router, private myhttp: ServerServiceService){
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
        Validators.pattern('^[0-9]+$')
      ]),
      sex: new FormControl('',[
        Validators.required,
        Validators.maxLength(1),
        Validators.pattern('F|M')
      ]),
      neutered: new FormControl('',[
        Validators.required,
        Validators.maxLength(1),
        Validators.pattern('N|Y')
      ])
    })
  }

  /**
   * Register Animal in database
   */
  registerAnimalDB():void{

    this.myhttp.registerAnimal(this.formAnimals.value).subscribe(
      (result: Animal) => {
        if (result == null){
          this.message = 'Ocurrio un Error al intentar guardar los datos';
        }else{
          console.log('from registerAnimalDb', result);
          this.message = 'Register done!';          
        }
      },
      (error) => {
        console.log('error from register', error);
      }
        
    )
  }
  
  /**
   * 
   */

  submit():void {
    this.registerAnimalDB();
  }
}
