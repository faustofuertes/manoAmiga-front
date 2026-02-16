import { Component, EventEmitter, Output } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-user-header',
  imports: [TranslatePipe],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  @Output() optionSelected = new EventEmitter();
  activeTab = 1;

  emitControlPanel() {
    this.activeTab = 1;
    this.optionSelected.emit(1);
  }

  emitMyPosts() {
    this.activeTab = 2;
    this.optionSelected.emit(2);
  }
}
