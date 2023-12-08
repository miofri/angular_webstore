import { createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';
import {
	loadCategories,
	loadCategoriesSuccess,
	loadCategoriesFailure,
} from './categories.action';

export type ActionStatus = 'pending' | 'loading' | 'error' | 'success';

export interface CategoriesState {
	categories: Category[];
	error: string | null;
	status: ActionStatus;
}

export const initialState: CategoriesState = {
	categories: [],
	error: null,
	status: 'pending',
};

export const categoriesReducer = createReducer(
	initialState,
	on(loadCategories, (state) => ({
		...state,
		status: 'loading' as ActionStatus,
	})),
	on(loadCategoriesSuccess, (state, { categories }) => ({
		...state,
		categories: categories,
		error: null,
		status: 'success' as ActionStatus,
	})),
	on(loadCategoriesFailure, (state, { error }) => ({
		...state,
		error: error,
		status: 'error' as ActionStatus,
	}))
);
