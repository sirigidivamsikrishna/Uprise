import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent {
  @Input() placeholder = '';
  @Input() Time = '';
  @Input() Icon = '';
  @Input() Hours = '';
  @Input() hideDate = '';
  @Input() label = '';
  @Input() name = '';
  @Input() error = '';
  @Input() minDate = '';
  @Input() formGroup: FormGroup;
}
