import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { PagenotfoundComponent } from './pages/page-not-found/page-not-found.component';
import { ResetpassComponent } from './pages/home/components/reset-pass/reset-pass.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full'
    },
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'resetpassword',
        component: ResetpassComponent
    },
    //Wild Card Route for 404 request 
    { 
        path: '**',
        pathMatch: 'full',  
        component: PagenotfoundComponent 
    }
];
