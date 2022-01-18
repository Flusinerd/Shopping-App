import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GroceryItemComponentModule } from '../../grocery-item/grocery-item.module';
import { GroceriesRoutingModule } from './groceries-routing.module';
import { GroceriesComponent } from './groceries.component';

@NgModule({
  declarations: [GroceriesComponent],
  imports: [
    CommonModule,
    GroceriesRoutingModule,
    IonicModule,
    GroceryItemComponentModule,
  ],
})
export class GroceriesModule {}
