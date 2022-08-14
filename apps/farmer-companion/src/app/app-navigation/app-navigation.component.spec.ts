import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { AppNavigationComponent } from './app-navigation.component';

describe('AppNavigationComponent', () => {
  let component: AppNavigationComponent;
  let fixture: ComponentFixture<AppNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppNavigationComponent],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        TranslateTestingModule.withTranslations({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
