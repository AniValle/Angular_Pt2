/**
 * @authors Ani Valle and Andrea Morales
 * @file    This file manages the session closing confirmation.
 */

import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ServerServiceService } from 'src/app/services/server-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  // Get user from local storage
  user:User = JSON.parse(localStorage.getItem("user") || '{}')
  message!:string;

  constructor (private route: Router, private _http: ServerServiceService) {}

  /**
   * Show a message depending on whether the user is logged in or not.
   * @returns message.
   */
  msjLogout():string{
    if (this.user){
      this.message = "Are you sure you want to log out?";
    }else{
      this.message = "You are not logged in";
    }
    return this.message
  }

  /**
   * Remove user from localstorage
   */
  logout(){
    this._http.logout();
    this.route.navigate(['/login']);
  }
}
