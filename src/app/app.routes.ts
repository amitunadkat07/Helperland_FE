import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PagenotfoundComponent } from './pages/page-not-found/page-not-found.component';
import { ResetpassComponent } from './pages/home/components/reset-pass/reset-pass.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { BookServiceComponent } from './pages/book-service/book-service.component';

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
        path: 'bookservice',
        component: BookServiceComponent,
        pathMatch: 'full'
    },
    {
        path: 'resetpassword',
        component: ResetpassComponent
    },
    {
        path: 'privacypolicy',
        component: PrivacyPolicyComponent
    },
    {
        path: 'terms&conditions',
        component: TermsComponent
    },
    //Wild Card Route for 404 request 
    { 
        path: '**',
        pathMatch: 'full',  
        component: PagenotfoundComponent 
    }
];
