import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePageStyle8Component } from './home-page-style8.component';

describe('HomePageStyle8Component', () => {
  let component: HomePageStyle8Component;
  let fixture: ComponentFixture<HomePageStyle8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageStyle8Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageStyle8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
