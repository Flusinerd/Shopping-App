import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RecipeSlideComponent } from './recipe-slide.component';

describe('RecipeSlideComponent', () => {
  let component: RecipeSlideComponent;
  let fixture: ComponentFixture<RecipeSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeSlideComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();
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
