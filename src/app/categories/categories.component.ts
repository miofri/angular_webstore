import { Component, OnInit } from '@angular/core';
import { AppState } from '../stores/app.state';
import { Store } from '@ngrx/store';
import { selectAllCategories } from '../stores/categories-store/categories.selectors';
import { Observable } from 'rxjs';
import { loadCategories } from '../stores/categories-store/categories.action';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
	constructor(private store: Store<AppState>) {}

	allCategories$ = this.store.select(selectAllCategories);
	error$!: Observable<string | null>;

	ngOnInit(): void {
		this.store.dispatch(loadCategories());
		this.allCategories$ = this.store.select(selectAllCategories);
		this.error$ = this.store.select((state) => state.categories.error);
	}
}
