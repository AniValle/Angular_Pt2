import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Animal } from '../models/Animal';


@Injectable({
  providedIn: 'root'
})
export class AnimalserviceService {
  url:string='http://localhost:3000';

  constructor(private _http: HttpClient) { }

  // metodos de conexión
  getAnimals(): Observable<Animal>{

    return this._http.get<Animal>(this.url+"/residents",  {responseType: "json" })

  }

  registerAnimal(animalData: Animal): Observable<Animal> {
    return this._http.post<Animal>(this.url+"/registerAnimal", animalData);
  }
}
