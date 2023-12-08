import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent {
  @Input() dataEmitted?: any;
  name?: string;
  names?: Array<string> = [];
  addname() {
    this.names?.push(this.name || '');
    console.log(this.names);
  }

  data?: any;
  shouwoutput() {
    console.log(this.data);
  }

  abc = ($event: any) => {
    console.log($event);
    this.data = $event;
    this.name = $event.firstname;
    this.names?.push(this.name || '');
  };
}
