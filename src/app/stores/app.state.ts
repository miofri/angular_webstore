import { CategoriesState } from './categories-store/categories.reducer';
import { ProductsState } from './products-store/product.reducer';

export interface AppState {
	products: ProductsState;
	categories: CategoriesState;
}
