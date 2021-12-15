import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppSettingsModalPage } from './app-settings-modal.page';

describe('AppSettingsModalPage', () => {
  let component: AppSettingsModalPage;
  let fixture: ComponentFixture<AppSettingsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSettingsModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppSettingsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
