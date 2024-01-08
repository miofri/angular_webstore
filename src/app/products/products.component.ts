import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllProducts } from '../stores/products-store/product.selectors';
import { Observable } from 'rxjs';
import { AppState } from '../stores/app.state';
import { loadProducts } from '../stores/products-store/product.actions';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css'],
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
}
