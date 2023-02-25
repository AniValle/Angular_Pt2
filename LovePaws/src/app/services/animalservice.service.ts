import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../models/Animal';


@Injectable({
  providedIn: 'root'
})

export class AnimalserviceService {
  url:string='http://localhost:3000';
  a!:Animal;

  constructor(private _http: HttpClient) { }

  // metodos de conexión
  getAnimals(): Observable<Animal>{

    return this._http.get<Animal>(this.url+"/residents",  {responseType: "json" })

  }

  // Obtener un animal dado un id
  getAnimal(id:any): Observable<Animal> {
    return this._http.get<Animal>(`${this.url}/animal/${id}`)
  }

  // Update
  updateAnimal(id:any, data:any): Observable<any> {
    return this._http.put(`${this.url}/update-animal/${id}`, data);
  }

  
  // Delete
  deleteAnimal(id:any): Observable<any> {
    return this._http.delete<any>(this.url + "/delete-animal", id)
  }
  // Add animal
  registerAnimal(animalData: Animal): Observable<Animal> {
    return this._http.post<Animal>(this.url+"/registerAnimal", animalData);
  }

  //Get animal by id
  myAnimal(animal: Animal){
    this.a= animal;
  }

}
