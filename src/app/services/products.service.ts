import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable, catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	private apiUrl = 'https://api.escuelajs.co/api/v1/products';

	constructor(private http: HttpClient) {}

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	};

	loadProducts(): Observable<Product[]> {
		return this.http.get<Product[]>(this.apiUrl).pipe(
			tap((p) => console.log('Loaded products:', p)),
			catchError(this.handleError<Product[]>('loadProducts'))
		);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 *
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
