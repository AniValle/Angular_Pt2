/**
 * @authors   Ani Valle and Andrea Morales
 * @file      This directive checks if the repeat password is correct.
 */
import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors} from '@angular/forms'

@Directive({
  selector: '[appRepitePass]',
  providers: [{provide: NG_VALIDATORS, useExisting:  RepitePassDirective, multi:true}]

})
export class RepitePassDirective implements Validator {

  @Input() parametro:any;//gets the value from the form

  constructor() { }
  
  validate(control: AbstractControl): ValidationErrors | null {
    if(control && control.value!= this.parametro){
      return {'repitePass':true}; // errors.
    }else{
      return null; // no errors
    }
  }
}
