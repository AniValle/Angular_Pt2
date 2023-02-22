import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalserviceService } from 'src/app/services/animalservice.service';
import { Animal } from 'src/app/models/Animal';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.css']
})
export class ResidentsComponent implements OnInit{

  Animals:any = [];
  user!:User;
  role!:string;
  
  constructor(public router:Router, private myhttp: AnimalserviceService ){
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") || '{}');
    this.role = `${this.user.role}`;
    this.myhttp.getAnimals().subscribe(res => {
      console.log(res)
      this.Animals =res;
    });
  }

  /**
   * Delete animal 
   */
  delete(id:any, i:any) {
    //console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.myhttp.deleteAnimal(id).subscribe((res) => {
        this.Animals.splice(i, 1);
      })
    }
  }


  sendFormAdd(): void{
    this.router.navigateByUrl('/formAnimals')
  }

  getMyAnimal(animal:Animal){
    this.myhttp.myAnimal(animal);
    this.router.navigateByUrl('/edit-animal');
  }

}
