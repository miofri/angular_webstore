import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../../services/products.service';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
	loadProducts,
	loadProductsSuccess,
	loadProductsFailure,
} from './product.actions';
import { Product } from 'src/app/models/product.model';
import { ActionStatus } from './product.reducer';

@Injectable()
export class ProductEffects {
	constructor(
		private actions$: Actions,
		private productService: ProductsService
	) {}

	loadProducts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadProducts),
			tap(() => console.log('loadProducts action dispatched')),
			mergeMap(() =>
				this.productService.loadProducts().pipe(
					map((products) => loadProductsSuccess({ products })),
					catchError((error) =>
						of(loadProductsFailure({ error: error.toString() }))
					)
				)
			)
		)
	);
}
