import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoriesPageStyle1Component } from './categories-page-style1.component';

describe('CategoriesPageStyle1Component', () => {
  let component: CategoriesPageStyle1Component;
  let fixture: ComponentFixture<CategoriesPageStyle1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesPageStyle1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesPageStyle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
