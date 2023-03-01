/**
 * @authors   Ani Valle and Andrea Morales
 * @file      This component manages the view of animal residents.
 *            It connects with a service, which makes the connection with the DB
 */
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

  //Set variables
  Animals:any = [];
  user!:User;
  role!:string;
  message!:string;
  element = false;
  
  //Call contructor with the service
  constructor(public router:Router, private myhttp: AnimalserviceService ){ }

  /**
   * With the start of this component
   * Check localstorage and consults the database with the service
   */
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") || '{}');
    this.role = `${this.user.role}`;
    this.myhttp.getAnimals().subscribe(res => {
      console.log(res)
      this.Animals =res;
    });
  }

  /**
   * If the action is confirmed delete the animal from database
   * @param animal object animal to delete 
   * @param i the index of the animal in the table
   */
  deleteAnimal(animal: Animal, i:any) {
    if(window.confirm('Do you want to go ahead?')) {
      //Check the id send to server
      console.log('animal id from the deleteAnimal in residents.', animal);

      //Send data to service and this one to server
      this.myhttp.deleteAnimalByID(animal.id).subscribe({
        next: (result: Animal) => {
          if( result == null){
            this.element = true;
            this.message = "Error occurred, no data in the database found!"
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
          }else{
            this.element = true;
            this.message = 'Error occurred, try again!'
          }
        }
      })
    }
  }

  /**
   * On click send to a view to add an animal form
   */
  sendFormAdd(): void{
    this.router.navigateByUrl('/formAnimals')
  }

  /**
   * On click gets the animal selected and redirects to form edit animal with this data
   * @param animal object animal received from table
   */
  getMyAnimal(animal:Animal){
    this.myhttp.myAnimal(animal);
    this.router.navigateByUrl('/edit-animal');
  }
}
