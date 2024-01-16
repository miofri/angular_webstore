import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { Product } from 'src/app/models/product.model';
import { Cart } from 'src/app/models/cart.model';

export const initialState: Cart = { items: [] };

export const cartReducer = createReducer(
	initialState,
	on(CartActions.addToCart, (state, { item }) => ({
		...state,
		items: Array.isArray(state.items) ? [...state.items, item] : [item],
	})),
	on(CartActions.setCart, (state, { cart }) => ({
		...state,
		items: cart.items,
	})),

	on(CartActions.updateCart, (state, { item }) => ({
		...state,
		items: Array.isArray(state.items)
			? state.items.map((cartItem) => {
					return cartItem.product.id === item.product.id
						? { ...cartItem, quantity: item.quantity }
						: cartItem;
			  })
			: [],
	}))
);
