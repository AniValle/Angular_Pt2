/**
 * @authors   Ani Valle and Andrea Morales
 * @file      Edit the view of database animal data
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userpipes'
})
export class UserpipesPipe implements PipeTransform {

  //Change the view of the mobile
  transform(rawNum:string) {
    rawNum = "+1"+ rawNum;

    const areaCodeStr = rawNum.slice(2,5);
    const midSectionStr = rawNum.slice(5,8);
    const lastSectionStr = rawNum.slice(8);

    return `${areaCodeStr} ${midSectionStr} ${lastSectionStr}`;
  }

}
