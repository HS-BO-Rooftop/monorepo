import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
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
  private boards = new BehaviorSubject<BoardDto[] | null>(null);
  searchControl = new FormControl<string>('');
  filteredBoards = new BehaviorSubject<BoardDto[] | null>(null);

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

    combineLatest([
      this.boards,
      this.searchControl.valueChanges.pipe(
        startWith(''),
        map((value) => value?.toLowerCase())
      ),
    ]).subscribe(([boards, search]) => {
      const filteredBoards =
        boards?.filter((board) =>
          board.name.toLowerCase().includes(search || '')
        ) ?? null;
      this.filteredBoards.next(filteredBoards);
    });
  }

  private loadBoards() {
    this.boardsService.findAllBoards().subscribe({
      next: (boards) => this.boards.next(boards),
      error: (error) => {
        console.log(error);
        this.loading.loading = false;
        this.toast.present('Error loading data', 'danger');
      },
    });
  }

  ionViewWillEnter() {
    this.loadBoards();
  }
}
