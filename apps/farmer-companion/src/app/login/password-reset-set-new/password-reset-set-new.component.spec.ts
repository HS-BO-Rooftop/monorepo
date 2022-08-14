import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MockLoginContainerComponent } from '../../../testing/mocks/components/login-container.mock';

import { PasswordResetSetNewComponent } from './password-reset-set-new.component';

describe('PasswordResetSetNewComponent', () => {
  let component: PasswordResetSetNewComponent;
  let fixture: ComponentFixture<PasswordResetSetNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordResetSetNewComponent, MockLoginContainerComponent],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        TranslateTestingModule.withTranslations({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordResetSetNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
