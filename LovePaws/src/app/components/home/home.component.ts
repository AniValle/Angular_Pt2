import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user!:string;

  constructor () {}

  /**
   * Verify if the localstorage is created
   * @returns boolean true or false
   */  
  loggedIn() {
    this.user = JSON.parse(localStorage.getItem("user") || '{}')
    return localStorage.getItem("user") ? true : false;
  }
}
