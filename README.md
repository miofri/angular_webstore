# E-Commerce System

This project revolves around the creation of an E-Commerce system using Angular for the frontend and interactions with the FakeAPI or an equivalent backend service. The main objective is to offer an intuitive shopping experience for users and an efficient management interface for administrators.

- Frontend: CSS, TypeScript, Angular, NgRx for state management
- Backend: [FakeAPI](https://fakeapi.platzi.com/) or equivalent backend service

## Table of Contents

- [Features](#features)
  - [Core Features](#1-core-features)
  - [Additional Features](#2-additional-features)
- [Prerequisites](#prerequisites)
- [Guidelines to start working with NgRx](#guidelines-to-start-working-with-ngrx)

## Features

### 1. Core features

- Guest Functionalities:
  - Product Browsing: Explore all available products, view product details, search, sort, and filter products.
  - Cart Management: Add products to the cart, view cart, and adjust quantities or remove items.
- User Functionalities
  - User Management: Sign up, log in, and log out. Users should not have admin rights upon registration.
  - Product Browsing, Cart Management.
- Admin Functionalities
  - User Management: Overview of all registered users, with the ability to delete users.
  - Product Management: View all products, add new products, edit existing products, and delete products.

### 2. Additional features

- User Functionalities
  - Profile Management: View and edit specific details of their profile. Option to delete their account.
  - Third-party Authentication: Allow registration and login using Google OAuth.
  - Ordering: Complete the purchase of items in the cart.
- Admin Functionalities
  - Extended User Management: Modify user roles, and register new users as admin.
- ... and any other enhancements that are envisioned...
- Start with some basic unit tests, such as

## Prerequisites

- Ensure the integration of NgRx for state management in the frontend.
- Implement routing and guards to protect certain routes.
- Properly handle errors, especially API related errors.
- Maintain a well-organized directory structure and naming convention in line with Angular best practices.
- The README should provide comprehensive information about the project and include deployment steps.

## Guidelines to start working with NgRx

1. Component creation

   ```
   ng generate component products
   ng generate component product-detail
   ng generate component cart
   ng generate component profile
   ng generate component admin-dashboard
   ng generate component manage-products
   ng generate component manage-users
   ```

   ... and generate all the components you might need. Otherwise, you can generate extra components later when needed.

2. Design Data Models

   Models can be stored either in a separate `src/models` folder or in component's respective folder. Please refer to the shape of data in the api to design the models. Example:

   - Products Model: `products.model.ts` (display list of products)
   - Product Model: `product.model.ts` (display single product)
   - Categories Model: `categories.model.ts`
   - User Model: `user.model.ts` (display single user)
   - Cart Model: `cart.model.ts`

3. Create services

- For example: Path: `src/app/services/products.service.ts`

```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/products'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  //add other CRUD operations
}
```

4. Setting up NgRx

- Define actions. For example, `products.actions.ts`:

  - Path: `src/app/store/actions/products.actions.ts`

  ```
  import { createAction, props } from '@ngrx/store';

  import { Product } from '../../models/product.model';

  export const loadProducts = createAction('[Products] Load Products');
  export const loadProductsSuccess = createAction('[Products] Load Products Success', props<{ products: Product[] }>());
  export const loadProductsFailure = createAction('[Products] Load Products Failure', props<{ error: any }>());
  // ... Similarly for other CRUD actions
  ```

- Implement effects to manage API requests. For example, let's handle the fetching of products from an API.

  - Path: `src/app/store/effects/products.effects.ts`

  ```
  import { Injectable } from '@angular/core';
  import { Actions, ofType, createEffect } from '@ngrx/effects';
  import { of } from 'rxjs';
  import { catchError, map, mergeMap } from 'rxjs/operators';

  import * as ProductsActions from './path-to-product-actions';
  import { ProductsService } from './path-to-products-service';  //

  @Injectable()
  export class ProductsEffects {

    constructor(
      private actions$: Actions,
      private productService: ProductsService  // Inject the ProductService
    ) {}

    loadProducts$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ProductsActions.loadProducts),
        mergeMap(() => this.productsService.getProducts()  // Use the injected service
          .pipe(
            map(products => ProductsActions.loadProductsSuccess({ products })),
            catchError(error => of(ProductsActions.loadProductsFailure({ error })))
          ))
      )
    );
  }
  ```

- Register effects. For example, let's register product effects in the root level.

  - Path: `src/app/app.module.ts`

  ```
  import { EffectsModule } from '@ngrx/effects';

  import {ProductsEffects} from './store/effects/products.effects';

  @NgModule({
  imports: [
      EffectsModule.forRoot([ProductsEffects]), // Register effects here
      // ...
  ],
  // ...
  })
  export class AppModule {}
  ```

- Create reducers. For example `products.reducer.ts`

  - Path: `src/app/store/reducers/products.reducer.ts`

    ```
    import { createReducer, on } from '@ngrx/store';

    import { Product } from '../../models/product.model';
    import * as ProductsActions from '../actions/products.actions';

    export const initialProductState: Product[] = [];

    export const productReducer = createReducer(
        initialProductState,
        on(ProductsActions.loadProductsSuccess, (state, { products }) => [...products])
        // ... Similarly for other CRUD actions
    );
    ```

- Configure store: Path `src/app/app.module.ts`

  ```
  import { StoreModule } from '@ngrx/store';
  import { EffectsModule } from '@ngrx/effects';

  import {ProductsEffect} from './store/effects/products.effects';
  import { productsReducer } from './store/reducers/products.reducer';

  @NgModule({
  imports: [
    StoreModule.forRoot({ products: productsReducer, //...other reducers}),
    EffectsModule.forRoot([ProductsEffect]), // Register effects here
    // ...
  ],
  // ...
  })
  export class AppModule {}
  ```

- Usage of NgRx store in components

  - `ProductsComponent`

  ```
  import { Component, OnInit } from '@angular/core';
  import { Store } from '@ngrx/store';

  import * as ProductsActions from './path-to-your-actions-file';

  @Component({
    selector: 'app-products',
    template: `
      <!-- Your component template here -->
    `
  })
  export class ProducsComponent implements OnInit {

    products$: Observable<Product[]>;

    constructor(private store: Store) { }

    ngOnInit() {
      products$ = this.store.select(selectProducts);
      // Dispatch the loadProducts action when the component initializes
      this.store.dispatch(ProductsActions.loadProducts());
    }

  }
  ```

  - `products.component.html`:

  ```
  //...
  <div *ngFor="let product of products$ | async">
      <!-- Display product details -->
  </div>
  //...
  ```
