import { Directive, Input } from '@angular/core';
//Imports que necesito
import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors} from '@angular/forms'

@Directive({
  selector: '[appRepitePass]',
  providers: [{provide: NG_VALIDATORS, useExisting:  RepitePassDirective, multi:true}]

})
export class RepitePassDirective implements Validator {

  @Input() parametro:any;//recoger un valor que viene desde el formulario

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    if(control && control.value!= this.parametro){
      return {'repitePass':true}; //cuando hay errores.
    }else{
      return null; // no hay errores
    }
  }
}
