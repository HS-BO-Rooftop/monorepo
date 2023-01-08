import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { WidgetsModule } from "../widgets/widgets.module";
import { BedDetailsPage } from './bed-details/bed-details.component';
import { BedsListRoutingModule } from './beds-list-routing.module';
import { BedsListPage } from './beds-list.component';
import { BoardDetailsPage } from './board-details/board-details.component';
@NgModule({
    declarations: [BedsListPage, BedDetailsPage, BoardDetailsPage],
    imports: [CommonModule, IonicModule, TranslateModule, BedsListRoutingModule, WidgetsModule]
})
export class BedsListModule {}
