/**
 * @authors   Ani Valle and Andrea Morales
 * @file      This component manages the editing of animal data.
 *            It connects with a service, which makes the connection with the DB
 */

import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimalserviceService } from 'src/app/services/animalservice.service';
import { Animal } from 'src/app/models/Animal';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {

  // Global variables
  getId!: any;
  message!: string;
  theAnimal!: Animal;
  element = false;
  user!: User;
  role!: string;

  //Constructor
  constructor(public formBuilder: FormBuilder,
    public router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private myhttp: AnimalserviceService) {

  }

  // Initialize the update form
  updateForm = new FormGroup({

    name: new FormControl('', []),
    specie: new FormControl('', []),
    breed: new FormControl('', []),
    age: new FormControl(0, []),
    sex: new FormControl('', []),
    neutered: new FormControl('', []),
  });

  /** Assign values to the edit form and a message in case a user reaches this page */
  ngOnInit() {
    this.theAnimal = this.myhttp.a;
    //console.log('Animal should be here!', this.theAnimal);
    this.updateForm.controls['name'].setValue(this.theAnimal.name);
    this.updateForm.controls['specie'].setValue(this.theAnimal.specie);
    this.updateForm.controls['breed'].setValue(this.theAnimal.breed);
    this.updateForm.controls['age'].setValue(this.theAnimal.age);
    this.updateForm.controls['sex'].setValue(this.theAnimal.sex);
    this.updateForm.controls['neutered'].setValue(this.theAnimal.neutered);
    this.user = JSON.parse(localStorage.getItem("user") || '{}');
    this.role = `${this.user.role}`;
    // Show message if not admin
    if (this.role !== 'admin') {
      this.element = true;
      this.message = "You must be admin to access this page ;)";
    }

  }

  /** Update Animal of Db 
   * 1. Get new values from the form
   * 2. Call the service function and pass the values of the animal to update them
   * 3. Manage errors
  */
  updateAnimalDB(): void {

    this.myhttp.updateAnimal({
      id: this.theAnimal.id,
      name: this.updateForm.get('name')?.value,
      specie: this.updateForm.get('specie')?.value,
      breed: this.updateForm.get('breed')?.value,
      age: this.updateForm.get('age')?.value,
      sex: this.updateForm.get('sex')?.value,
      neutered: this.updateForm.get('neutered')?.value,
    }).subscribe({
      next: (result) => {
        if (result == null || result == 0) {
          this.element = true;
          this.message = 'Error updating the animal, try again!';
        } else {
          console.log('from updateAnimalDB', result);
          this.element = true;
          this.message = 'Update done succesfully!';
        }
      },
      error: (error) => {
        console.log('error from updateanimaldb', error);
        if (error.statusText == 'Forbidden') {
          this.element = true;
          this.message = 'You have no permission to do this!'
        }
      }
    })
  }

  /** This is just a secondary function that calls the function that updates the animal in the db */
  onUpdate(): any {
    this.updateAnimalDB()

  }

  // ---------------------- Redirects -----------------------//
  /**
   *  This function redirects to the 'resident' page
   */
  redirects(): void {
    this.router.navigateByUrl('/residents')
  }
}
