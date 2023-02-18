import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.css']
})
export class ResidentsComponent {

  constructor(public router:Router ){
  }

  sendFormAdd(): void{
    this.router.navigateByUrl('/formAnimals')
  }

}
