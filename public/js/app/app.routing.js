import { RouterModule } from '@angular/router';
import { AuthenticationComponent } from './auth/authentication.component';
import { ServerInfoComponent } from './server-info.component';
import { ServerUpdateComponent } from './server-update.component';
var APP_ROUTES = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'app/info', component: ServerInfoComponent, pathMatch: 'full' },
    { path: 'app/update', component: ServerUpdateComponent, pathMatch: 'full' },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' }
];
export var routing = RouterModule.forRoot(APP_ROUTES);
