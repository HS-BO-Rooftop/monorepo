import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MockLandingContainerComponent } from '../../../testing/mocks/components/landing-container.mock';
import { MockLoginContainerComponent } from '../../../testing/mocks/components/login-container.mock';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginFormComponent,
        MockLandingContainerComponent,
        MockLoginContainerComponent,
      ],
      imports: [
        IonicModule,
        TranslateTestingModule.withTranslations({}),
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
