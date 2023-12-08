import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import {
	loadProducts,
	loadProductsSuccess,
	loadProductsFailure,
} from './product.action';

export type ActionStatus = 'pending' | 'loading' | 'error' | 'success';

export interface ProductsState {
	products: Product[];
	error: string | null;
	status: ActionStatus;
}

export const initialState: ProductsState = {
	products: [],
	error: null,
	status: 'pending',
};

export const productReducer = createReducer(
	initialState,
	on(loadProducts, (state) => ({
		...state,
		status: 'loading' as ActionStatus,
	})),
	on(loadProductsSuccess, (state, { products }) => ({
		...state,
		products: products,
		error: null,
		status: 'success' as ActionStatus,
	})),
	on(loadProductsFailure, (state, { error }) => ({
		...state,
		error: error,
		status: 'error' as ActionStatus,
	}))
);
