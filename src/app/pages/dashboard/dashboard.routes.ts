import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
        children: [
            {
                path: 'home',
                loadComponent: () => import('./components/dashboard-data/dashboard-data.component').then(m => m.DashboardDataComponent)
            },
            {
                path: 'servicehistory',
                loadComponent: () => import('./components/service-history/service-history.component').then(m => m.ServiceHistoryComponent)
            },
            {
                path: 'serviceschedule',
                loadComponent: () => import('./components/service-schedule/service-schedule.component').then(m => m.ServiceScheduleComponent)
            },
            {
                path: 'favourites',
                loadComponent: () => import('./components/favourites/favourites.component').then(m => m.FavouritesComponent)
            },
            {
                path: 'invoices',
                loadComponent: () => import('./components/invoices/invoices.component').then(m => m.InvoicesComponent)
            },
            {
                path: 'notifications',
                loadComponent: () => import('./components/notifications/notifications.component').then(m => m.NotificationsComponent)
            },
            {
                path: 'myprofile',
                loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent)
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            }
        ]
    },
    
]