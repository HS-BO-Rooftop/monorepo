import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MockLoginContainerComponent } from '../../../testing/mocks/components/login-container.mock';

import { PasswordResetCodeComponent } from './password-reset-code.component';

describe('PasswordResetCodeComponent', () => {
  let component: PasswordResetCodeComponent;
  let fixture: ComponentFixture<PasswordResetCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordResetCodeComponent, MockLoginContainerComponent],
      imports: [
        IonicModule.forRoot(),
        TranslateTestingModule.withTranslations({}),
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordResetCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
