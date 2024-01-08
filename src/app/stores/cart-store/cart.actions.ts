import { createAction, props } from '@ngrx/store';

export const loadCart = createAction('[Cart Page] Load Cart');
export const loadCartSuccess = createAction(
	'[Cart Page] Load Cart Success',
	props<{ cart: any }>()
);
export const loadCartFailure = createAction(
	'[Cart Page] Load Cart Failure',
	props<{ error: string }>()
);

export const addToCart = createAction(
	'[Cart Page] AddTo Cart',
	props<{ item: any }>()
);
