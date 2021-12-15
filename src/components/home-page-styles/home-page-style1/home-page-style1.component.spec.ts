import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePageStyle1Component } from './home-page-style1.component';

describe('HomePageStyle1Component', () => {
  let component: HomePageStyle1Component;
  let fixture: ComponentFixture<HomePageStyle1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageStyle1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageStyle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
