import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServerServiceService } from '../services/server-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingGuard implements CanActivate {

  constructor (private router: Router, private _http: ServerServiceService) { 
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const usuario=this._http.userData();
    if (usuario!=null){
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
  
}
