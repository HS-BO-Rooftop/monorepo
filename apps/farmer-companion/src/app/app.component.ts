import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'rooftop-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');

    // Get the current language
    const browserLang = translate.getBrowserLang() || 'en';

    // Use the current language
    translate.use(browserLang);
  }
}
