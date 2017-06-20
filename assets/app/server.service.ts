import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import  'rxjs/Rx';
import { Observable } from 'rxjs';

import { Server } from './server.model';

@Injectable()
export class ServerService{
  private server: Server;

  constructor(private http: Http){

  }

  getServer(){
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.get('http://localhost:3000/server' + token)
      .map((response: Response) => {
        const server = response.json().obj;
        this.server = server;
        return server;
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }

  updateServer(interval: Number){
    const body = JSON.stringify(interval);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.patch('http://localhost:3000/server/update/'  + interval, body)
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }
}
