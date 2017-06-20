import { Component, OnInit } from "@angular/core";

import { Server } from './server.model';
import { ServerService } from './server.service';

@Component({
  selector: 'app-info',
  templateUrl: './server-info.component.html',
  styles: []
})
export class ServerInfoComponent implements OnInit {

  server: Server;

  constructor(private serverService: ServerService ) { }

  ngOnInit(){
    this.serverService.getServer()
      .subscribe(
        (server: Server) => {
          this.server = server
        }
      );
  }
}
