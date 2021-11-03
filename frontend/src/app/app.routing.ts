import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { HomeComponent } from './components/user/home/home.component';
import { ProductComponent } from './components/user/product/product.component';

export const routes: Routes = [
    // User Routes
    { path: '', component: HomeComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'user/register', component: RegisterComponent },
    { path: 'user/login', component: LoginComponent },
    { path: 'user/profile', component: ProfileComponent },
    { path: 'user/dashboard', component: DashboardComponent },
    // Admin Routes

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);