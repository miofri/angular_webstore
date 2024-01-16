import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatCardModule } from '@angular/material/card';

import { ProductsComponent } from './products/products.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { productReducer } from './stores/products-store/product.reducer';
import { ProductEffects } from './stores/products-store/product.effects';
import { categoriesReducer } from './stores/categories-store/categories.reducer';
import { CategoriesEffects } from './stores/categories-store/categories.effects';
import { CategoriesComponent } from './categories/categories.component';
import { CartEffects } from './stores/cart-store/cart.effects';
import { cartReducer } from './stores/cart-store/cart.reducer';
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [
		AppComponent,
		ProductsComponent,
		ProductDetailComponent,
		CartComponent,
		ProfileComponent,
		AdminDashboardComponent,
		ManageProductsComponent,
		ManageUsersComponent,
		CategoriesComponent,
		LoginComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		EffectsModule.forRoot([]),
		StoreRouterConnectingModule.forRoot(),
		StoreModule.forRoot({}, {}),
		StoreModule.forFeature('products', productReducer),
		StoreModule.forFeature('categories', categoriesReducer),
		StoreModule.forFeature('cart', cartReducer),
		EffectsModule.forFeature([ProductEffects, CategoriesEffects, CartEffects]),
		BrowserAnimationsModule,
		MatCardModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
