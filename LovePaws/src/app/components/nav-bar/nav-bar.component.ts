import { Component } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  user!:User;
  role!:string;

  constructor () {}

   /**
   * Verify if the localstorage is created
   * @returns boolean true or false
   */  
   loggedIn() {
    this.user = JSON.parse(localStorage.getItem("user") || '{}')
    this.role = `${this.user.role}`;
    return localStorage.getItem("user") ? true : false;
  }
}
