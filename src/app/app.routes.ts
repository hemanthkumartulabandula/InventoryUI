import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { authGuard } from './auth/auth.guard';


export const routes: Routes = [
    { path: 'products', component: ProductListComponent, canActivate: [authGuard] },
    { path: 'products/add', component: ProductFormComponent, canActivate: [authGuard] },
    { path: 'products/edit/:id', component: ProductFormComponent, canActivate: [authGuard] },

    { path: 'categories', component: CategoryListComponent, canActivate: [authGuard] },
    { path: 'categories/add', component: CategoryFormComponent, canActivate: [authGuard] },
    { path: 'categories/edit/:id', component: CategoryFormComponent, canActivate: [authGuard] },

    { path: 'suppliers', component: SupplierListComponent, canActivate: [authGuard] },
    { path: 'suppliers/add', component: SupplierFormComponent, canActivate: [authGuard] },
    { path: 'suppliers/edit/:id', component: SupplierFormComponent, canActivate: [authGuard] },


    { path: 'login', component: AuthLoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
