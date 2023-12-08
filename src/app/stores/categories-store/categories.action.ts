import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';

export const loadCategories = createAction('[Categories Page] Load Categories');
export const loadCategoriesSuccess = createAction(
	'[Categories Page] Load Categories Success',
	props<{ categories: Category[] }>()
);
export const loadCategoriesFailure = createAction(
	'[Categories Page] Load Categories Failure',
	props<{ error: string }>()
);
