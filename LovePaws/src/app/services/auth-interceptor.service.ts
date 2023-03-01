/**
 * @authors   Ani Valle and Andrea Morales
 * @file      Intercepts the token and manage it.
 *            It connects with a service to use methods
 */
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ServerServiceService } from './server-service.service';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor{

  //Calls the constructor with the service
  constructor(private router: Router, private _http: ServerServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token: string = (localStorage.getItem('token') || '{}');

    let request = req;

    //Check if the token is created
    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    //In case of error in token 
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          if(window.confirm('Session expired, log in again!')) {
            this.router.navigateByUrl('/login');
            this._http.logout();
          }
          this.router.navigateByUrl('/login');
          this._http.logout();
        }

        return throwError(() => err );

      })
    );
  }

}
