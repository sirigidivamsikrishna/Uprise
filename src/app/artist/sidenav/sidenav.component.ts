import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  urls = [
    {
      route: '/artist/songs',
      name: 'Songs Management',
      icon: 'fa fa-music',
    },
    {
      route: '/artist/events',
      name: 'Event Management',
      icon: 'pi pi-calendar-minus',
    },
    {
      route: '/artist/bandprofile',
      name: 'Band Profile ',
      icon: 'fa fa-users',
    },
  ];
}
