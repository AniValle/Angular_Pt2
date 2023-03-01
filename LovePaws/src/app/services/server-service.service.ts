/**
 * @authors   Ani Valle and Andrea Morales
 * @file      Service for user manage with the database
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import {catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ServerServiceService {

  //url used in server
  url:string='http://localhost:3000';

  //Set observables
  private userSubject: BehaviorSubject<User>;
  public user:Observable<User>; 

  /**
   * Checks if the user is logged
   * @returns user object or null
   */
  public userData():User{
    return this.userSubject.value;
  }

  //Calls the contructor
  constructor(private _http: HttpClient) { 
    this.userSubject= new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));//beggining status of observable
    this.user=this.userSubject.asObservable();
  }

  /**
   * Validate the username and password given in login.
   * @param login object user with username and password
   * @returns user object if found and token generated or null if not
   */
  validateUsers(login: User): Observable<User>{

    return this._http.post<any>(this.url+"/login", login, {responseType: "json" }).pipe(
      map(res =>{
        if(res!=null){
          const user:User=new User(res.data.user ,res.data.password, res.data.role, res.data.name, res.data.lastname, res.data.mail, res.data.mobile);
          //checks the user
          console.log("Objecte Usuari");
          console.log(user);
          
          //set localstorage from response of the server
          localStorage.setItem('user',JSON.stringify(res.data));
          localStorage.setItem('token',res.token);
          this.userSubject.next(user);
        }
        return res.data;
      })
    );
  }

  /**
   * Get petiton of all users data
   * @returns response of server 
   */
  getUsers(): Observable<User>{
    return this._http.get<User>(this.url+"/users",  {responseType: "json" })
  }

  /**
   * Post petition to crate a new user in database
   * @param credentialsUser object user with all inputs data
   * @returns response of server 
   */
  registerUser(credentialsUser: User): Observable<User>{
    return this._http.post<User>(this.url+"/register", credentialsUser, {responseType:"json"});
  }

  /**
   * On click removes localstorage and reset the observable user
   */
  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(JSON.parse(null!));
  }
}

