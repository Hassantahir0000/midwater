import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePageStyle4Component } from './home-page-style4.component';

describe('HomePageStyle4Component', () => {
  let component: HomePageStyle4Component;
  let fixture: ComponentFixture<HomePageStyle4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageStyle4Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageStyle4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
