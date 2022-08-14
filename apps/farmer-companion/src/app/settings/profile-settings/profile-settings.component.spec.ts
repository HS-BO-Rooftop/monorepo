import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { ProfileSettingsPage } from './profile-settings.component';

describe('ProfileSettingsComponent', () => {
  let component: ProfileSettingsPage;
  let fixture: ComponentFixture<ProfileSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileSettingsPage],
      imports: [
        IonicModule,
        RouterTestingModule,
        TranslateTestingModule.withTranslations({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
