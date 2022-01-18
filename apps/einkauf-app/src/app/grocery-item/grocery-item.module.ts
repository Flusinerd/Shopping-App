import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroceryItemComponent } from './grocery-item.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [GroceryItemComponent],
  exports: [GroceryItemComponent]
})
export class GroceryItemComponentModule {}
