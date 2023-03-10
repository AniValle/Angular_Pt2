/**
 * @authors Ani Valle and Andrea Morales
 * @file    This page contains the management of adding a new animal to the DB, 
 *          connects with the service and this with the database
 */

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Animal } from 'src/app/models/Animal';
import { User } from 'src/app/models/User';
import { AnimalserviceService } from 'src/app/services/animalservice.service';

@Component({
  selector: 'app-form-animals',
  templateUrl: './form-animals.component.html',
  styleUrls: ['./form-animals.component.css']
})
export class FormAnimalsComponent implements OnInit {

  // Global variables
  formAnimals!: FormGroup;
  message!: string;
  element = false;
  user!: User;
  role!: string;

  constructor(public router: Router, private myhttp: AnimalserviceService) {

    // Validations of the formAnimals
    this.formAnimals = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z` ]+$')
      ]),
      specie: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z]+$')

      ]),
      breed: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z ]+$')

      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.maxLength(2),
        Validators.pattern('^[0-9]+$'),
        Validators.max(30)
      ]),
      sex: new FormControl('', [
        Validators.required,
        Validators.maxLength(1),
        Validators.pattern('F|M|f|m')
      ]),
      neutered: new FormControl('', [
        Validators.required,
        Validators.maxLength(1),
        Validators.pattern('N|Y|n|y')
      ])
    })
  }

  /** Manage permissions depending on whether a user is admin or not */
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") || '{}');
    this.role = `${this.user.role}`;
    if (this.role !== 'admin') {
      this.element = true;
      this.message = "You must be admin to access this page ;)";
    }
  }

  /**
   * Register Animal in database
   * Call the service function to add Animal and handle errors
   */
  registerAnimalDB(): void {

    this.myhttp.registerAnimal(this.formAnimals.value).subscribe({
      next: (result: Animal) => {
        if (result == null) {
          this.element = true;
          this.message = 'Error occurred, try again';
        } else {
          console.log('from registerAnimalDb', result);
          this.element = true;
          this.message = 'Register done!';

        }
      },
      error: (error) => {
        console.log('error from register', error);
        if (error.statusText == "Forbidden") {
          this.element = true;
          this.message = 'You have no permission to do this!';
        }

      }

    })
  }

  // ---------------------- Redirects -----------------------//
  /**
   *  This function redirects to the 'resident' page
   */
  redirects(): void {
    this.router.navigateByUrl('/residents')
  }

  /**
   * Secondary function.
   * Call the functions to register the animal
   */
  submit(): void {
    this.registerAnimalDB();
  }
}
