var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
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
], AppModule);
export { AppModule };
