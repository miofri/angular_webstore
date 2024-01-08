import { Component, OnInit } from '@angular/core';
import { AppState } from '../stores/app.state';
import { Store } from '@ngrx/store';
import { selectAllCategories } from '../stores/categories-store/categories.selectors';
import { Observable } from 'rxjs';
import { loadCategories } from '../stores/categories-store/categories.actions';
import { Product } from '../models/product.model';
import { CategoriesService } from '../services/categories.service';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
	constructor(
		private store: Store<AppState>,
		private categoryService: CategoriesService
	) {}

	allCategories$ = this.store.select(selectAllCategories);
	error$!: Observable<string | null>;
	selectedCategory: number | undefined;
	selectedProducts: Product[] | undefined;

	ngOnInit(): void {
		this.store.dispatch(loadCategories());
		this.allCategories$ = this.store.select(selectAllCategories);
		this.error$ = this.store.select((state) => state.categories.error);
	}

	loadProducts(category: number) {
		this.selectedCategory = category;
		this.categoryService
			.loadProductsByCategory(category)
			.subscribe((product) => (this.selectedProducts = product));
	}
}
