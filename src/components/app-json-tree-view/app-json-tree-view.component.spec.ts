import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppJsonTreeViewComponent } from './app-json-tree-view.component';

describe('AppJsonTreeViewComponent', () => {
  let component: AppJsonTreeViewComponent;
  let fixture: ComponentFixture<AppJsonTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppJsonTreeViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppJsonTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
