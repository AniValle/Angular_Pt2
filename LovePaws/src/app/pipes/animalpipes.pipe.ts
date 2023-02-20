import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'animalpipes'
})
export class AnimalpipesPipe implements PipeTransform {

    transform(value: any, args: any): any {
      if (args!=null){
        if(args == 'sex'){
          switch(value){
            case 'M' : return 'Male';
            case 'F' : return 'Female';
          }
        }
        if(args == 'neutered'){
          switch(value){
            case 'Y': return 'Yes';
            case 'N': return 'No';

          }
        }
      }
      
      return null;
  }

}
