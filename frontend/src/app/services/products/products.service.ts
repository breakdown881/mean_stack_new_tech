import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(
        private http: HttpClient
    ) { }

    // Get products by Nav Query Partial Text
    partialQuery(query): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', "application/json");
        return this.http
            .post<any>('http://localhost:5000/api/product/search', { query: query }, { headers: headers })
            .pipe(
                tap((data) => { },
                    catchError(this.handleError<any>('User Registration Unsuccessful'))
                )
            );
    }

    // get Product by Id
    getProductById(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', "application/json");
        let product = this.http
            .get<any>('http://localhost:5000/api/product/' + id, { headers: headers })
            .pipe(
                tap((data) => { },
                    catchError(this.handleError<any>('User Registration Unsuccessful'))
                )
            );
        return product;
    }

    // Error Handlers
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead

            console.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }
}