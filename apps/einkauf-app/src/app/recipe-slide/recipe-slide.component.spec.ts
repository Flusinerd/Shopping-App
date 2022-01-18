import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSlideComponent } from './recipe-slide.component';

describe('RecipeSlideComponent', () => {
  let component: RecipeSlideComponent;
  let fixture: ComponentFixture<RecipeSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
