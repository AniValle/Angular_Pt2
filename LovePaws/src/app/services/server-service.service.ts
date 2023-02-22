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

    return this._http.post<any>(this.url+"/login", login, {responseType: "json" }).pipe(
      map(res =>{
        

        if(res!=null){
          const user:User=new User(res.data.user ,res.data.password, res.data.role, res.data.name, res.data.lastname, res.data.mail, res.data.mobile);
          console.log("Objecte Usuari");
          console.log(user);
          
          localStorage.setItem('user',JSON.stringify(res.data));
          localStorage.setItem('token',res.token);
          this.userSubject.next(user);
        }
        return res.data;

      })
    );
  }

  getUsers(): Observable<User>{
    return this._http.get<User>(this.url+"/users",  {responseType: "json" })
  }

  registerUser(credentialsUser: User): Observable<User>{
    return this._http.post<User>(this.url+"/register", credentialsUser, {responseType:"json"});
  }

  
  
  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
     
    this.userSubject.next(JSON.parse(null!));
  }
}

