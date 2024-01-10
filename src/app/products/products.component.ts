import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllProducts } from '../stores/products-store/product.selectors';
import { Observable } from 'rxjs';
import { AppState } from '../stores/app.state';
import { loadProducts } from '../stores/products-store/product.actions';
import { Product } from '../models/product.model';
import { addToCart } from '../stores/cart-store/cart.actions';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css', '../shared-style.css'],
})
export class ProductsComponent implements OnInit {
	constructor(private store: Store<AppState>) {}

	allProducts$ = this.store.select(selectAllProducts);
	error$!: Observable<string | null>;

	ngOnInit(): void {
		this.store.dispatch(loadProducts());
		this.allProducts$ = this.store.select(selectAllProducts);
		this.error$ = this.store.select((state) => state.products.error);
	}
	addToCart(addItem: Product) {
		const item = {
			product: addItem,
			quantity: 1,
		};
		this.store.dispatch(addToCart({ item }));
	}
}
