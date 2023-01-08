import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { BoardsService } from '../../api/services';
import { LoadingService } from '../../loading.service';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'rooftop-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss'],
})
export class BoardDetailsPage implements OnInit {
  private _boardName = '';
  public get boardName() {
    return this._boardName;
  }

  constructor(
    private readonly _loading: LoadingService,
    private readonly _toast: ToastService,
    private readonly _route: ActivatedRoute,
    private readonly _boardService: BoardsService
  ) {}

  ngOnInit(): void {
    this._route.params
    .pipe(filter((x): x is { boardId: string } => x['boardId']))
    .subscribe({
      next: (params) => {
        this.loadBoardDetails(params.boardId)
        .subscribe({
          next: (board) => {
            this._boardName = board.name;
          }
        })
      },
    });
  }

  private loadBoardDetails(boardId: string) {
    return this._boardService.findOneBoard({ id: boardId })
  }
}
