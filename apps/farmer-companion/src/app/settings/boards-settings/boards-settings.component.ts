import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardDto } from '../../api/models';
import { BoardsService } from '../../api/services';
import { loadingHelper, LoadingService } from '../../loading.service';

@Component({
  selector: 'rooftop-boards-settings',
  templateUrl: './boards-settings.component.html',
  styleUrls: ['./boards-settings.component.scss'],
})
export class BoardsSettingsPage implements OnInit {
  boards = new BehaviorSubject<BoardDto[] | null>(null);

  constructor(
    private readonly boardsService: BoardsService,
    private readonly loading: LoadingService
  ) {}

  ngOnInit(): void {
    loadingHelper([this.boards]).subscribe(
      (loading) => (this.loading.loading = loading)
    );

    this.boardsService.findAllBoards().subscribe((boards) => {
      this.boards.next(boards);
    });
  }
}
