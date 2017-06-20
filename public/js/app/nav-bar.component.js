var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var NavComponent = (function () {
    function NavComponent() {
        this.isCollapsed = true;
    }
    NavComponent.prototype.collapsed = function (event) {
        console.log(event);
    };
    NavComponent.prototype.expanded = function (event) {
        console.log(event);
    };
    return NavComponent;
}());
NavComponent = __decorate([
    Component({
        selector: 'nav-bar',
        templateUrl: './nav-bar.component.html'
    })
], NavComponent);
export { NavComponent };
