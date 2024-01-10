import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../stores/app.state';
import { loadCart } from '../stores/cart-store/cart.actions';
@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['../shared-style.css', './cart.component.css'],
})
export class CartComponent {
	constructor(private store: Store<AppState>) {}

	allItems$ = this.store.select((state) => state.cart.items);

	ngOnInit(): void {
		this.store.dispatch(loadCart());
		this.allItems$ = this.store.select((state) => state.cart.items);
		console.log(this.store.select((state) => state.cart.items));
	}

	emptyCart() {
		localStorage.clear();
		this.store.dispatch(loadCart());
		this.allItems$ = this.store.select((state) => state.cart.items);
	}
}
