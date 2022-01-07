import { Component, Input } from '@angular/core';

@Component({
  selector: 'jk-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() isActive?: boolean;
}
