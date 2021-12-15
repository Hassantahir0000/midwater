import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoriesPageStyle4Component } from './categories-page-style4.component';

describe('CategoriesPageStyle4Component', () => {
  let component: CategoriesPageStyle4Component;
  let fixture: ComponentFixture<CategoriesPageStyle4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesPageStyle4Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesPageStyle4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
