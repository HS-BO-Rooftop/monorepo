import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsPage } from './user-settings.component';

describe('UserSettingsComponent', () => {
  let component: UserSettingsPage;
  let fixture: ComponentFixture<UserSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSettingsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
