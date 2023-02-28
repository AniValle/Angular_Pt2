import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalserviceService } from 'src/app/services/animalservice.service';
import { Animal } from 'src/app/models/Animal';
import { User } from 'src/app/models/User';
import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.css']
})
export class ResidentsComponent implements OnInit{

  Animals:any = [];
  user!:User;
  role!:string;
  message!:string;
  element = false;
  
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


  deleteAnimal(animal: Animal, i:any) {
    if(window.confirm('Do you want to go ahead?')) {
        console.log('animal id from the deleteAnimal in residents.', animal);
      this.myhttp.deleteAnimalByID(animal.id).subscribe({
        next: (result: Animal) => {
          if( result == null){
            this.element = true;
            this.message = "Error occurred"
          }else{
            console.log('From deleteAnimal',result)
            this.Animals.splice(i, 1);
            this.element = true;
            this.message = 'Success deleting the animal'
          }
        },
        error: (error) => {
          console.log('Error from delete', error);
          if (error.statusText == "Forbidden"){
            this.element = true;
            this.message = 'You have no permission'
          }
        }
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
