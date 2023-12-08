import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { CategoriesService } from 'src/app/services/categories.service';
import { of } from 'rxjs';
import {
	loadCategories,
	loadCategoriesSuccess,
	loadCategoriesFailure,
} from './categories.action';

@Injectable()
export class CategoriesEffects {
	constructor(
		private actions$: Actions,
		private categoryService: CategoriesService
	) {}

	loadCategories$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadCategories),
			tap(() => console.log('loadCategories action dispatched')),
			mergeMap(() =>
				this.categoryService.loadCategories().pipe(
					map((categories) => loadCategoriesSuccess({ categories })),
					catchError((error) =>
						of(loadCategoriesFailure({ error: error.toString() }))
					)
				)
			)
		)
	);
}
