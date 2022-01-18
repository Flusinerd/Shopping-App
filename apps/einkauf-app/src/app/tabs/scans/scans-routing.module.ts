import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScansComponent } from './scans.component';

const routes: Routes = [
  {
    path: '',
    component: ScansComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScansRoutingModule {}
