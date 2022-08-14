import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MockLandingContainerComponent } from '../../testing/mocks/components/landing-container.mock';

import { LandingPage } from './landing.page';

describe('LandingPage', () => {
  let component: LandingPage;
  let fixture: ComponentFixture<LandingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPage, MockLandingContainerComponent],
      imports: [
        IonicModule.forRoot(),
        TranslateTestingModule.withTranslations({}),
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
