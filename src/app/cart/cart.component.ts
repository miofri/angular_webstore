import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../stores/app.state';
import {
	addQuantityToCart,
	loadCart,
	reduceQuantityFromCart,
} from '../stores/cart-store/cart.actions';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart.model';
@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['../shared-style.css', './cart.component.css'],
})
export class CartComponent {
	constructor(private store: Store<AppState>) {}

	allItems$ = this.store.select((state) => state.cart.items);
	totalPrice: number = 0;

	ngOnInit(): void {
		this.store.dispatch(loadCart());
		this.allItems$ = this.store.select((state) => state.cart.items);
		this.allItems$.subscribe((items) => {
			this.totalPrice = 0;
			items.forEach((item) => {
				const totalItemPrice = item.product.price * item.quantity;
				this.totalPrice += totalItemPrice;
			});
		});
	}

	emptyCart() {
		localStorage.clear();
		this.store.dispatch(loadCart());
		this.allItems$ = this.store.select((state) => state.cart.items);
	}

	addAmount(item: CartItem) {
		this.store.dispatch(addQuantityToCart({ item }));
		this.allItems$ = this.store.select((state) => state.cart.items);
	}

	reduceAmount(item: CartItem) {
		this.store.dispatch(reduceQuantityFromCart({ item }));
		this.allItems$ = this.store.select((state) => state.cart.items);
	}
}
