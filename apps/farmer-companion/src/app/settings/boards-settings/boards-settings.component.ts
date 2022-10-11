import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardDto } from '../../api/models';
import { BoardsService } from '../../api/services';
import { loadingHelper, LoadingService } from '../../loading.service';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'rooftop-boards-settings',
  templateUrl: './boards-settings.component.html',
  styleUrls: ['./boards-settings.component.scss'],
})
export class BoardsSettingsPage implements OnInit {
  boards = new BehaviorSubject<BoardDto[] | null>(null);

  constructor(
    private readonly boardsService: BoardsService,
    private readonly loading: LoadingService,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    loadingHelper([this.boards]).subscribe({
      next: (loading) => (this.loading.loading = loading),
      error: (error) => {
        console.log(error);
        this.loading.loading = false;
      },
    });

    this.boardsService.findAllBoards().subscribe({
      next: (boards) => this.boards.next(boards),
      error: (error) => {
        console.log(error);
        this.loading.loading = false;
        this.toast.present('Error loading data', 'danger');
      },
    });
  }
}
