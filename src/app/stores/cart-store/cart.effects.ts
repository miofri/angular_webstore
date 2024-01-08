import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from 'src/app/local-storage.service';
import * as CartActions from './cart.actions';
import { tap } from 'rxjs';

@Injectable()
export class CartEffects {
	constructor(
		private action$: Actions,
		private localStorageService: LocalStorageService
	) {}

	addItemToCart$ = createEffect(
		() =>
			this.action$.pipe(
				ofType(CartActions.addToCart),
				tap(({ item }) => {
					let cart = this.localStorageService.getItem('cart') || [];
					cart = [...cart, item];
					this.localStorageService.setItem('cart', cart);
				})
			),
		{ dispatch: false }
	);
}
