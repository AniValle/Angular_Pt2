/**
 * @authors   Ani Valle and Andrea Morales
 * @file      This component manages the view of users.
 *            It connects with a service, which makes the connection with the DB
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ServerServiceService } from 'src/app/services/server-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent  implements OnInit{

  //Set variables
  Users:any = [];
  user!:User;
  role!:string;
  message!:string;
  element = false;
  
  //Calls the constructor with the service
  constructor(public router:Router, private myhttp: ServerServiceService){}
  
  /**
   * With the start of this component
   * Check localstorage and consults the database with the service
   * Check if the user is admin to display the data
   */
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") || '{}');
    this.role = `${this.user.role}`;
    
    this.myhttp.getUsers().subscribe(res => {
      console.log(res)
      
      if (this.role !== 'admin'){
        this.element = true;
        this.message = "You must be admin to access this page ;)";
      }
      this.Users =res;
      
    });
  }

  // ---------------------- Redirects -----------------------//
  /**
   *  This function redirects to the 'home' page
   */
  redirects(): void{
    this.router.navigateByUrl('/home')
  }


}
