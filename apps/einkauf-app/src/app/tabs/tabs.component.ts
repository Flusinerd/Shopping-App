import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  public tabs: Tab[] = [
    {
      name: 'scans',
      label: 'Scans',
      icon: 'barcode',
    },
    {
      name: 'grocery',
      icon: 'cart',
      label: 'Groceries',
    },
    {
      name: 'home',
      icon: 'home',
      label: 'Home',
    },
    {
      name: 'recipes',
      icon: 'book',
      label: 'Recipes',
    },
    {
      name: 'settings',
      icon: 'cog',
      label: 'Settings',
    },
  ];
}

interface Tab {
  name: string;
  label: string;
  icon: string;
}
