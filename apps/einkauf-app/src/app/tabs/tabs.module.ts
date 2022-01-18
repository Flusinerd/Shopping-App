import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './tabs.component';
import { TabsRoutingModule } from './tabs.routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TabsRoutingModule],
  declarations: [TabsComponent],
  exports: [TabsComponent],
})
export class TabsModule {}
