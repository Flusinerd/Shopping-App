import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jan-krueger.eu-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() isActive: boolean;

  constructor() {}

  ngOnInit(): void {}
}
