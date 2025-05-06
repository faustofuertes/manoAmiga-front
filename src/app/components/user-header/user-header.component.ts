import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-header',
  imports: [],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  @Output() optionSelected = new EventEmitter();

  emitControlPanel() {
    this.optionSelected.emit('controlPanel');
  }

  emitMyPosts() {
    this.optionSelected.emit('myPosts');
  }

}
