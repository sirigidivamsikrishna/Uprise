import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-location',
  templateUrl: './input-location.component.html',
  styleUrls: ['./input-location.component.scss'],
})
export class InputLocationComponent implements OnInit {
  @Input() icon = '';
  @Input() placeholder = '';
  @Input() name = '';
  @Input() label = '';
  @Input() error = '';
  @Input() results = '';
  @Input() binding = '';
  @Output() location = new EventEmitter<any>();
  @Input() formGroup: FormGroup;
  constructor() {}

  ngOnInit(): void {}
  locationChange() {
    this.location.emit();
  }
}
