import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoriesPageStyle5Component } from './categories-page-style5.component';

describe('CategoriesPageStyle5Component', () => {
  let component: CategoriesPageStyle5Component;
  let fixture: ComponentFixture<CategoriesPageStyle5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesPageStyle5Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesPageStyle5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
