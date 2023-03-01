import { Component } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user!:User;
  name!:string;

  constructor () {}

  /**
   * Check if local storage is created to show welcome message
   * @returns boolean true or false
   */  
  loggedIn() {
    this.user = JSON.parse(localStorage.getItem("user") || '{}')
    this.name = `${this.user.name} ${this.user.lastname}`;
    return localStorage.getItem("user") ? true : false;
  }

}
