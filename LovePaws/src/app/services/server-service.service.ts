import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ServerServiceService {

  url:string='http://localhost:3000';

  constructor(private _http: HttpClient) { }

  // getServers() {
  //   return this.httpclient.get('/api/servers');
  // }


  // metodos de connección
  validateUsers(login: User): Observable<User>{

    //let login = new User(usuari,password);

    return this._http.post<User>(this.url+"/login", login, {responseType:"json"});
  }
}

