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

	addToCart$ = createEffect(() =>
		this.action$.pipe(
			ofType(CartActions.addToCart),
			map(({ item }) => {
				const cart: Cart = this.getCartFromStorage();
				const cartItemIndex = this.findCartItemIndex(
					cart,
					parseInt(item.product.id)
				);
				this.updateCart(cart, cartItemIndex, item);
				return CartActions.setCart({ cart });
			})
		)
	);

	loadCart$ = createEffect(() =>
		this.action$.pipe(
			ofType(CartActions.loadCart),
			map(() => {
				const cart: Cart = this.getCartFromStorage();
				console.log({ cart });
				return CartActions.setCart({ cart });
			})
		)
	);

	addQuantityToCart$ = createEffect(() =>
		this.action$.pipe(
			ofType(CartActions.addQuantityToCart),
			map(({ item }) => {
				const newQuantity = item.quantity + 1;
				const cart: Cart = this.getCartFromStorage();
				const cartItemIndex = this.findCartItemIndex(
					cart,
					parseInt(item.product.id)
				);
				cartItemIndex !== -1
					? (cart.items[cartItemIndex].quantity = newQuantity)
					: null;
				this.localStorageService.setItem('cart', cart);
				return CartActions.setCart({ cart });
			})
		)
	);

	reduceQuantityFromCart$ = createEffect(() =>
		this.action$.pipe(
			ofType(CartActions.reduceQuantityFromCart),
			map(({ item }) => {
				const newQuantity = item.quantity - 1;
				let cart: Cart = this.getCartFromStorage();
				const cartItemIndex = this.findCartItemIndex(
					cart,
					parseInt(item.product.id)
				);
				if (newQuantity === 0) {
					cart.items = cart.items.filter(
						(cartItem) => cartItem.product.id !== item.product.id
					);
				} else if (cartItemIndex !== -1) {
					cart.items[cartItemIndex].quantity = newQuantity;
				}
				this.localStorageService.setItem('cart', cart);
				return CartActions.setCart({ cart });
			})
		)
	);

	// redeuceQuantityFromCart$ = createEffect(() =>

	getCartFromStorage(): Cart {
		return this.localStorageService.getItem('cart') || { items: [] };
	}
	findCartItemIndex(cart: Cart, productId: number): number {
		return cart.items.findIndex(
			(cartItem: CartItem) => parseInt(cartItem.product.id) === productId
		);
	}
	updateCart(cart: Cart, cartItemIndex: number, item: CartItem): void {
		if (cartItemIndex !== -1) {
			cart.items[cartItemIndex].quantity++;
		} else {
			cart.items.push({ ...item, quantity: 1 });
		}
		this.localStorageService.setItem('cart', cart);
	}
}
