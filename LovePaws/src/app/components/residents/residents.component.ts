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
  
  constructor(public router:Router, private myhttp: AnimalserviceService, private auth: AuthInterceptorService ){
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

  // deleteAnimal(animal: Animal) {
  //   console.log(animal.id);
  //   if(window.confirm('Do you want to go ahead?')) {
  //     this.myhttp.deleteAnimal(animal).subscribe({
  //       next: (result: Animal) => {
  //         if( result == null){
  //           this.message = "Error occurred"
  //         }else{
  //           console.log('From deleteAniml',result)
  //           this.message = 'Success'
  //         }
  //       },
  //       error: (error) => {
  //         console.log('Error fron delete', error);
  //         if (error.statusText == "Forbidden"){
  //           this.message = 'You have no permission'
  //         }
  //       }
  //     })
  //   }
  // }

  sendFormAdd(): void{
    this.router.navigateByUrl('/formAnimals')
  }

  getMyAnimal(animal:Animal){
    this.myhttp.myAnimal(animal);
    this.router.navigateByUrl('/edit-animal');
  }
}
