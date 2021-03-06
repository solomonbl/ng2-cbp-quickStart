import { ModuleWithProviders }      from '@angular/core';
import {
    RouterModule,
    Routes,
}                                   from '@angular/router';

import { UserManagementComponent }           from './user-management';

const navRoutes: Routes = [
    { path: 'sample/user-management', component: UserManagementComponent },
];

export const sampleRouting: ModuleWithProviders = RouterModule.forChild(navRoutes);
