import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-slide',
  templateUrl: './recipe-slide.component.html',
  styleUrls: ['./recipe-slide.component.scss'],
})
export class RecipeSlideComponent {
  @Input() thumbnailUrl?: string;
  @Input() title?: string;
  @Input() id?: string;
}
