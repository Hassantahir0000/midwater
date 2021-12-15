import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppLogPagePage } from './app-log-page.page';

describe('AppLogPagePage', () => {
  let component: AppLogPagePage;
  let fixture: ComponentFixture<AppLogPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLogPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppLogPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
