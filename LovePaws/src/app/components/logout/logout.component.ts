import { Component } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  user:User = JSON.parse(localStorage.getItem("user") || '{}')
  message!:string;

  constructor () {}

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
    if(this.user){
      localStorage.removeItem("user");
    }
  }

}
