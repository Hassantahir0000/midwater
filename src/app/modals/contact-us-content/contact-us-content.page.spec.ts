import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactUsContentPage } from './contact-us-content.page';

describe('ContactUsContentPage', () => {
  let component: ContactUsContentPage;
  let fixture: ComponentFixture<ContactUsContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUsContentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactUsContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
