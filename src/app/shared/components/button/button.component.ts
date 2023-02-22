import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  constructor() {}
  @Input() label: '';
  @Input() type: '';
  @Input() buttonicon: '';
  @Output() submitForm = new EventEmitter<any>();
  @Input() disabled: boolean = false;
  @Input() loader: '';

  ngOnInit(): void {}
  submit() {
    this.submitForm.emit();
  }
}
