import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  role!:string;

  constructor () {}

   /**
   * Verify if the localstorage is created
   * @returns boolean true or false
   */  
   loggedIn() {
    this.role = JSON.parse(localStorage.getItem("user") || '{}')
    return localStorage.getItem("user") ? true : false;
  }
}
