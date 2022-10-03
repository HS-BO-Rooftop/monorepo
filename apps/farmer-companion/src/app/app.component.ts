import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'rooftop-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    translate: TranslateService,
    plattform: Platform,
    weather: WeatherService
  ) {
    translate.setDefaultLang('en');

    weather.$weatherForecastForDays.subscribe((data) => console.log(data));

    // Get the current language
    const browserLang = translate.getBrowserLang() || 'en';

    // Use the current language
    translate.use(browserLang);

    // Translate the backButton text on ios
    if (plattform.is('ios')) {
      const text = translate.instant('Back') || 'Back';
      const Ionic = (window as any).Ionic;
      (Ionic.config as Map<string, string>).set('backButtonText', text);
    }
  }
}
