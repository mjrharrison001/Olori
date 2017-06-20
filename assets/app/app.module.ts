import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { NavComponent } from './nav-bar.component';
import { routing } from './app.routing';
import { AuthenticationComponent } from './auth/authentication.component';
import { ServerInfoComponent } from './server-info.component';
import { ServerUpdateComponent } from './server-update.component';
import { ServerService } from './server.service';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        AuthenticationComponent,
        ServerInfoComponent,
        ServerUpdateComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      routing,
      HttpModule,
      ReactiveFormsModule
    ],
    providers: [AuthService, ServerService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
