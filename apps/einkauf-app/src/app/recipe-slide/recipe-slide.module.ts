import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RecipeSlideComponent } from './recipe-slide.component';

@NgModule({
  declarations: [RecipeSlideComponent],
  exports: [RecipeSlideComponent],
  imports: [IonicModule],
})
export class RecipeSlideModule {}
