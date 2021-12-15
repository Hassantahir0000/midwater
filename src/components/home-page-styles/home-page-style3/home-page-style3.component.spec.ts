import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePageStyle3Component } from './home-page-style3.component';

describe('HomePageStyle3Component', () => {
  let component: HomePageStyle3Component;
  let fixture: ComponentFixture<HomePageStyle3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageStyle3Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageStyle3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
