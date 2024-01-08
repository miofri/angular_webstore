import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';

export const initialState: any = [];
export const cartReducer = createReducer(
	initialState,
	on(CartActions.addToCart, (state, { item }) => [...state, item])
);
