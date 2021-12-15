import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoriesPageStyle2Component } from './categories-page-style2.component';

describe('CategoriesPageStyle2Component', () => {
  let component: CategoriesPageStyle2Component;
  let fixture: ComponentFixture<CategoriesPageStyle2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesPageStyle2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesPageStyle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
