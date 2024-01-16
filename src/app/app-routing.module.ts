import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{ path: 'products', component: ProductsComponent },
	{ path: '', redirectTo: '/products', pathMatch: 'full' },
	{ path: 'categories', component: CategoriesComponent },
	{ path: 'cart', component: CartComponent },
	{ path: 'login', component: LoginComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
