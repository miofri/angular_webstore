import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Product } from 'src/app/models/product.model';
import { Cart } from 'src/app/models/cart.model';

export const selectCart = (state: AppState) => state.cart;
export const selectAllItemInCart = createSelector(
	selectCart,
	(state: Cart) => state
);
