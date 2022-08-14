import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MockLoginContainerComponent } from '../../../testing/mocks/components/login-container.mock';

import { PasswordResetRequestComponent } from './password-reset-request.component';

describe('PasswordResetRequestComponent', () => {
  let component: PasswordResetRequestComponent;
  let fixture: ComponentFixture<PasswordResetRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PasswordResetRequestComponent,
        MockLoginContainerComponent,
      ],
      imports: [IonicModule, TranslateTestingModule.withTranslations({})],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordResetRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
