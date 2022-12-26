import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BedDetailsPage } from './bed-details/bed-details.component';
import { BedsListPage } from './beds-list.component';
import { BoardDetailsPage } from './board-details/board-details.component';

const routes: Routes = [
  { path: '', component: BedsListPage },
  { path: ':id', component: BedDetailsPage },
  { path: ':id/boards/:boardId', component: BoardDetailsPage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BedsListRoutingModule { }
