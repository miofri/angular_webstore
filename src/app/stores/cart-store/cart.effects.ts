import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import * as CartActions from './cart.actions';
import { map, tap } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/cart.model';

@Injectable()
export class CartEffects {
	constructor(
		private action$: Actions,
		private localStorageService: LocalStorageService
	) {}

	addToCart$ = createEffect(
		() =>
			this.action$.pipe(
				ofType(CartActions.addToCart),
				tap(({ item }) => {
					let cart: Cart = this.localStorageService.getItem('cart') || {
						items: [],
					};
					if (!Array.isArray(cart.items)) {
						// Initialize items if it's not an array
						cart.items = [];
					}
					const cartItemIndex = cart.items.findIndex(
						(cartItem: CartItem) => cartItem.product.id === item.product.id
					);
					if (cartItemIndex !== -1) {
						cart.items[cartItemIndex].quantity++;
					} else {
						cart.items.push({ ...item, quantity: 1 });
					}
					this.localStorageService.setItem('cart', cart);
				})
			),
		{ dispatch: false }
	);
	loadCart$ = createEffect(() =>
		this.action$.pipe(
			ofType(CartActions.loadCart),
			map(() => {
				const cart = this.localStorageService.getItem('cart') || { items: [] };
				console.log({ cart });
				return CartActions.setCart({ cart });
			})
		)
	);
}
