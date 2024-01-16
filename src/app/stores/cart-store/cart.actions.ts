import { createAction, props } from '@ngrx/store';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';

export const loadCart = createAction('[Cart Page] Load Cart');

export const setCart = createAction(
	'[Cart Page] Set Cart',
	props<{ cart: Cart }>()
);
export const addToCart = createAction(
	'[Cart Page] AddTo Cart',
	props<{ item: CartItem }>()
);
export const updateCart = createAction(
	'[Cart Page] Update Cart',
	props<{ item: CartItem }>()
);

export const addQuantityToCart = createAction(
	'[Cart Page] AddQuantity Cart',
	props<{ item: CartItem }>()
);

export const reduceQuantityFromCart = createAction(
	'[Cart Page] ReduceQuantity Cart',
	props<{ item: CartItem }>()
);
