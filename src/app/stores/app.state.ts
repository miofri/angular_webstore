import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { CategoriesState } from './categories-store/categories.reducer';
import { ProductsState } from './products-store/product.reducer';

export interface AppState {
	products: ProductsState;
	categories: CategoriesState;
	cart: Cart;
}
