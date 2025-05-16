import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  imports: [],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  @Output() optionSelected = new EventEmitter();

  emitPublicaciones() {
    this.optionSelected.emit(1);
  }

  emitUsuarios() {
    this.optionSelected.emit(2);
  }

}
