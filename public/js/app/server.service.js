var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
var ServerService = (function () {
    function ServerService(http) {
        this.http = http;
    }
    ServerService.prototype.getServer = function () {
        var _this = this;
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get('http://localhost:3000/server' + token)
            .map(function (response) {
            var server = response.json().obj;
            _this.server = server;
            return server;
        })
            .catch(function (error) {
            return Observable.throw(error.json());
        });
    };
    ServerService.prototype.updateServer = function (interval) {
        var body = JSON.stringify(interval);
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('http://localhost:3000/server/update/' + interval, body)
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            return Observable.throw(error.json());
        });
    };
    return ServerService;
}());
ServerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], ServerService);
export { ServerService };
