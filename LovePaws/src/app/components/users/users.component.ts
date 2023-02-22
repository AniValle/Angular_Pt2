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

  Users:any = [];
  user!:User;
  role!:string;
  fieldTextType!: boolean;

  constructor(public router:Router, private myhttp: ServerServiceService ){
  }
  
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") || '{}');
    this.role = `${this.user.role}`;
    
    this.myhttp.getUsers().subscribe(res => {
      console.log(res)
      this.Users =res;
    });
  }

  
  toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
  }

}
