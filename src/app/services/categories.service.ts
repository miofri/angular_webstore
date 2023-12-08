import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CategoriesService {
	private apiUrl = 'https://api.escuelajs.co/api/v1/categories';

	constructor(private http: HttpClient) {}

	loadCategories() {
		return this.http.get<Category[]>(this.apiUrl).pipe(
			tap((c) => console.log('Loaded categories:', c)),
			catchError(this.handleError<Category[]>('loadCategory'))
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
