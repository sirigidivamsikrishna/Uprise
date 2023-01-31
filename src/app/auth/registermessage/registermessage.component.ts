import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registermessage',
  templateUrl: './registermessage.component.html',
  styleUrls: ['./registermessage.component.scss'],
})
export class RegistermessageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  clickhere() {
    this.router.navigate(['/auth/login']);
  }
}
