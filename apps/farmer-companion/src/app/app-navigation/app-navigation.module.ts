import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AppNavigationComponent } from './app-navigation.component';

@NgModule({
  imports: [CommonModule, IonicModule, TranslateModule],
  declarations: [AppNavigationComponent],
  exports: [AppNavigationComponent],
})
export class AppNavigationModule {}
