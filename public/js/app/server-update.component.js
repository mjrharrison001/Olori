var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from './server.service';
var ServerUpdateComponent = (function () {
    function ServerUpdateComponent(serverService) {
        this.serverService = serverService;
    }
    ServerUpdateComponent.prototype.onSubmit = function () {
        // Edit
        this.newInterval = this.myForm.value.interval;
        this.serverService.updateServer(this.newInterval)
            .subscribe(function (result) { return console.log(result); }, function (error) { return console.log(error); });
    };
    ServerUpdateComponent.prototype.ngOnInit = function () {
        this.myForm = new FormGroup({
            interval: new FormControl(null, [
                Validators.required
            ])
        });
    };
    return ServerUpdateComponent;
}());
ServerUpdateComponent = __decorate([
    Component({
        selector: 'app-info',
        templateUrl: './server-update.component.html',
        styles: []
    }),
    __metadata("design:paramtypes", [ServerService])
], ServerUpdateComponent);
export { ServerUpdateComponent };
