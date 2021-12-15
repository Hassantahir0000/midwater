import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePageStyle2Component } from './home-page-style2.component';

describe('HomePageStyle2Component', () => {
  let component: HomePageStyle2Component;
  let fixture: ComponentFixture<HomePageStyle2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageStyle2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageStyle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
