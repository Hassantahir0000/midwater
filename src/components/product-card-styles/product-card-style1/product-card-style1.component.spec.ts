import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductCardStyle1Component } from './product-card-style1.component';

describe('ProductCardStyle1Component', () => {
  let component: ProductCardStyle1Component;
  let fixture: ComponentFixture<ProductCardStyle1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardStyle1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardStyle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
