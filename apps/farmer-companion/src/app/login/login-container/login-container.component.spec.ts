import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MockLandingContainerComponent } from '../../../testing/mocks/components/landing-container.mock';

import { LoginContainerComponent } from './login-container.component';

describe('LoginContainerComponent', () => {
  let component: LoginContainerComponent;
  let fixture: ComponentFixture<LoginContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginContainerComponent, MockLandingContainerComponent],
      imports: [IonicModule, TranslateModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
