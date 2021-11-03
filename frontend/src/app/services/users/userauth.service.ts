import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }


  private extractData(res: Response) {
    let body = res;
    return body || {};
  }


  // Register User By API 
  register(user): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http
      .post<any>('http://localhost:5000/api/user/register', user, { headers: headers })
      .pipe(
        tap((data) => {
          console.log('success');
        },
          catchError(this.handleError<any>('User Registration Unsuccessful'))
        )
      );
  }

  // Login User by API Authentication
  authenticateUser(user): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http
      .post<any>('http://localhost:5000/api/user/auth', user, { headers: headers })
      .pipe(
        tap((data) => {
          console.log('success');
        },
          catchError(this.handleError<any>('User Authentication Unsuccessful'))
        )
      );
  }

  // Get user Profile by token and user
  getProfile(): Observable<any> {
    this.loadToken();
    // This is setting the token
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    headers.set('Content-Type', "application/json");
    return this.http
      .get<any>('http://localhost:5000/api/user/profile', { headers: headers })
      .pipe(
        tap((data) => {
          console.log(data);
          console.log('success');
        })
      );
  }


  // Store User and User Toaken in Local Storage
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // Load Token from the Localstorage
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Logout the user and Destroy the Token and User
  logoutUser() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    sessionStorage.clear();
  }

  // Error Handlers
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
