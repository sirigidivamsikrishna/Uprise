import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  constructor(private route: Router) {}
  ngOnInit(): void {
    this.route.navigate(['/artist/songs']);
  }
  logout() {
    console.log('kig');
    localStorage.clear();
    this.route.navigateByUrl('/auth/login');
  }
}
