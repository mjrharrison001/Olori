import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './auth/authentication.component';
import { ServerInfoComponent } from './server-info.component';
import { ServerUpdateComponent } from './server-update.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'app/info', component: ServerInfoComponent, pathMatch: 'full' },
  { path: 'app/update', component: ServerUpdateComponent, pathMatch: 'full' },
  { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
