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

  // Add animal
  registerAnimal(animalData: Animal): Observable<Animal> {
    return this._http.post<Animal>(this.url+"/registerAnimal", animalData)
;
  }

  // Obtener un animal dado un id  -> De momento no las usamos
  getAnimal(id:any): Observable<Animal> {
    return this._http.get<Animal>(`${this.url}/animal/${id}`)
  }

  // Update -> FUNCIONA
  updateAnimal(data:any): Observable<any> {
    return this._http.put(`${this.url}/update-animal`, data);
  }

  
  // Delete
  deleteAnimalByID(id:any): Observable<Animal> {
    console.log('deleteAnimal received value in the "animalservice"', id);
    return this._http.post<Animal>(this.url + "/delete-animal", {id: id});

  }


  //Get animal by id
  myAnimal(animal: Animal){
    return this.a = animal;
  }

}
