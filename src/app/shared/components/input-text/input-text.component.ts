import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormControlName,
} from '@angular/forms';
@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements OnInit {
  @Input() placeholder = '';
  @Input() type = '';
  @Input() label = '';
  @Input() icon = '';
  @Input() iconpadding = '';
  @Input() name = '';
  @Input() error = '';
  @Input() maxlength;
  @Input() minlength;
  @Input() pattern = '';
  @Input() formGroup: FormGroup;
  constructor() {}

  ngOnInit(): void {}
  icondisable() {
    this.type = 'show-password';
  }
  iconenable() {
    this.type = 'password';
  }
}
