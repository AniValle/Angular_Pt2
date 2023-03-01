/**
 * @authors   Ani Valle and Andrea Morales
 * @file      Service for animal manage with the database
 */

import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../models/Animal';


@Injectable({
  providedIn: 'root'
})

export class AnimalserviceService {

  //url used in server
  url:string='http://localhost:3000';
  //Animal get from table, row selected
  a!:Animal;

  //Calls the constructor
  constructor(private _http: HttpClient) { }

  /**
   * Get of all animal residents of the database
   * @returns response of server
   */
  getAnimals(): Observable<Animal>{

    return this._http.get<Animal>(this.url+"/residents",  {responseType: "json" })

  }

  /**
   * Gets all the values of form animal and send it to server to add it
   * @param animalData animal object from inputs
   * @returns response of server
   */
  registerAnimal(animalData: Animal): Observable<Animal> {
    return this._http.post<Animal>(this.url+"/registerAnimal", animalData)
;
  }

  /**
   * Gets all the values from form edit and send it to server to modify it
   * @param data animal object from inputs
   * @returns response of server
   */
  updateAnimal(data:any): Observable<any> {
    return this._http.put(`${this.url}/update-animal`, data);
  }

  
  /**
   * Delete an animal send to server the id of it
   * @param id of the animal selected
   * @returns response of server
   */
  deleteAnimalByID(id:any): Observable<Animal> {
    console.log('deleteAnimal received value in the "animalservice"', id);
    return this._http.post<Animal>(this.url + "/delete-animal", {id: id});

  }


  /**
   * Get the animal by id
   * @param animal object id
   * @returns animal selected
   */
  myAnimal(animal: Animal){
    return this.a = animal;
  }

}
