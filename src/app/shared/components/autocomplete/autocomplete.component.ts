import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent {
  @Input() label = '';
  @Input() name = '';
  @Input() formGroup: FormGroup;
  @Input() options: any[] = [];
  @Input() error = '';
  @Input() placeholder = '';
  @Output() changeAddress = new EventEmitter();
  @Output() selectEvent = new EventEmitter();
  style: string =
    '  background: #0f0f0f;border: 0.6px solid rgba(240, 240, 240, 0.3);width: 100%;color: #ffffff;box-sizing: border-box;border-radius: 2px;padding-left: 1.7rem;';
  constructor() {}

  ngOnInit(): void {}
  Change(event): void {
    this.changeAddress.emit(event);
  }

  clearsearch() {
    this.formGroup.get(this.name).reset();
  }
}
