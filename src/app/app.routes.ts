import { Routes } from '@angular/router';
import path from 'path';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { HomeComponent } from '../pages/home/home.component';
import { ResetpassComponent } from '../components/resetpass/resetpass.component';
import { PagenotfoundComponent } from '../pages/pagenotfound/pagenotfound.component';

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
