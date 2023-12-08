import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';

export const loadProducts = createAction('[Product Page] Load Product');
export const loadProductsSuccess = createAction(
	'[Product Page] Load Product Success',
	props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
	'[Product Page] Load Product Failure',
	props<{ error: string }>()
);
