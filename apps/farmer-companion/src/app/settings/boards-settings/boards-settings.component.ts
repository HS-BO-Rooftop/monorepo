import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardDto } from '../../api/models';
import { BoardsService } from '../../api/services';

@Component({
  selector: 'rooftop-boards-settings',
  templateUrl: './boards-settings.component.html',
  styleUrls: ['./boards-settings.component.scss'],
})
export class BoardsSettingsPage implements OnInit {
  boards = new BehaviorSubject<BoardDto[]>([]);

  constructor(private readonly boardsService: BoardsService) {}

  ngOnInit(): void {
    this.boardsService.findAllBoards().subscribe((boards) => {
      this.boards.next(boards);
    });
  }
}
