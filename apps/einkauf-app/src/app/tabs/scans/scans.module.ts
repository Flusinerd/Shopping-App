import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScansRoutingModule } from './scans-routing.module';
import { ScansComponent } from './scans.component';

@NgModule({
  declarations: [ScansComponent],
  imports: [CommonModule, ScansRoutingModule],
})
export class ScansModule {}
