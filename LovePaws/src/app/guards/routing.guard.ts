/**
 * @authors   Ani Valle and Andrea Morales
 * @file      This guard checks if you are logged and grants the view.
 *            It connects with a service, which makes the connection with the DB
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ServerServiceService } from '../services/server-service.service';

@Injectable({
  providedIn: 'root'
})

export class RoutingGuard implements CanActivate {

  //Calls the constructor with the service
  constructor (private router: Router, private _http: ServerServiceService) {}

  /**
   * Grants the acces to a route or not 
   * @param route to check
   * @returns boolean if have permission or not
   */
  canActivate(route: ActivatedRouteSnapshot) {
    //Check if user is logged
    const user=this._http.userData();

    if (user!=null){
      return true; //user logged can see the view
    }

    //user not logged redirects to home
    this.router.navigate(['/home']);
    return false;
  }
  
}
