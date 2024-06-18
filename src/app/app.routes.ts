import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PagenotfoundComponent } from './pages/page-not-found/page-not-found.component';
import { ResetpassComponent } from './pages/home/components/reset-pass/reset-pass.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.dashboardRoutes)
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
