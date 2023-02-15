import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerServiceService {

  url:string='http://localhost:3000';

  private userSubject: BehaviorSubject<User>;
  public user:Observable<User>; 

  public userData():User{
    return this.userSubject.value;
  }

  constructor(private _http: HttpClient) { 
    this.userSubject= new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));//estat inicial del BehaviorSubject
    this.user=this.userSubject.asObservable();
  }

  // metodos de conexión
  validateUsers(login: User): Observable<User>{

    return this._http.post<User>(this.url+"/login", login, {responseType: "json" }).pipe(
      map(res =>{
        console.log("Resposta del servidor");
        console.log(JSON.stringify(res));

        if(res!=null){
          const user:User=new User(res.user ,res.password, res.rol, res.name, res.lastname, res.mail, res.mobile);
          console.log("Objecte Usuari");
          console.log(user);
          
          localStorage.setItem('user',JSON.stringify(res));

          this.userSubject.next(user);
        }
        return res;

      })
    );
  }

  registerUser(credentialsUser: User): Observable<User>{
    return this._http.post<User>(this.url+"/register", credentialsUser, {responseType:"json"});
  }
  
  logout(){
    localStorage.removeItem('user');
     
    this.userSubject.next(JSON.parse(null!));
  }
}

