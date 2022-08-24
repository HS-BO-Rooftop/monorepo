import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rooftop-boards-settings',
  templateUrl: './boards-settings.component.html',
  styleUrls: ['./boards-settings.component.css'],
})
export class BoardsSettingsPage implements OnInit {
  boards: Board[];

  constructor() {
    // Create 20 mock boards
    this.boards = Array.from({ length: 20 }, (_, k) => ({
      id: `${k + 1}`,
      name: `Board ${k + 1}`,
    }));
    console.log('Boards', this.boards);
  }

  ngOnInit(): void {
    console.log(this.boards);
  }
}

type Board = {
  id: string;
  name: string;
};
