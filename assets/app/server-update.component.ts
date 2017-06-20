import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Server } from './server.model';
import { ServerService } from './server.service';

@Component({
  selector: 'app-info',
  templateUrl: './server-update.component.html',
  styles: []
})
export class ServerUpdateComponent implements OnInit {

  server: Server;
  newInterval: Number;
  myForm: FormGroup;

  constructor(private serverService: ServerService ) { }

  onSubmit(){
    // Edit
    this.newInterval = this.myForm.value.interval;
    this.serverService.updateServer(this.newInterval)
      .subscribe(
        result => console.log(result),
        error => console.log(error)
      );
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      interval: new FormControl(null, [
        Validators.required
      ])
    })
  }

}
