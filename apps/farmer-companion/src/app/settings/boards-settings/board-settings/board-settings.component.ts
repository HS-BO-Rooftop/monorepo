import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, filter, lastValueFrom } from 'rxjs';
import { BedDto, BoardConfigurationDto, BoardDto } from '../../../api/models';
import { BedsService, BoardsService } from '../../../api/services';
import { loadingHelper, LoadingService } from '../../../loading.service';
import { ToastService } from '../../../toast.service';

@Component({
  selector: 'rooftop-board-settings',
  templateUrl: './board-settings.component.html',
  styleUrls: ['./board-settings.component.scss'],
})
export class BoardSettingsPage implements OnInit {
  readonly alertOptions = {
    header: this.translation.instant('Select a bed') || 'Select a bed',
    subHeader:
      this.translation.instant('Select the bed where the board is installed') ||
      'Select the bed where the board is installed',
    translucent: true,
  };

  boardData = new BehaviorSubject<BoardDto | null>(null);
  bedData = new BehaviorSubject<BedDto[] | null>(null);
  configurationData = new BehaviorSubject<BoardConfigurationDto[] | null>(null);

  readonly form = this.fb.group({
    name: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    bedId: this.fb.control<string | null>(null),
  });
  constructor(
    private readonly translation: TranslateService,
    private readonly boardService: BoardsService,
    private readonly route: ActivatedRoute,
    private readonly bedsService: BedsService,
    private readonly fb: FormBuilder,
    private readonly loading: LoadingService,
    private readonly toastCtrl: ToastService
  ) {}

  ngOnInit(): void {
    this.getBeds();

    this.route.params.subscribe((params) => {
      if (params['boardId']) {
        this.getBoard(params['boardId']);
        this.getConfiguration(params['boardId']);
      }
    });

    loadingHelper([
      this.boardData,
      this.bedData,
      this.configurationData,
    ]).subscribe((loading) => (this.loading.loading = loading));

    combineLatest([this.boardData, this.bedData])
      .pipe(filter((arr) => arr.every(Boolean)))
      .subscribe(([board, beds]) => {
        if (!board || !beds) {
          return;
        }
        this.form.patchValue({
          name: board.name,
          bedId: board.bed_id,
        });
      });
  }

  private async getBoard(id: string) {
    this.boardService.findOneBoard({ id }).subscribe({
      next: (board) => {
        this.boardData.next(board);
      },
      error: (error) => {
        this.loading.loading = false;
        console.error(error);
        this.toastCtrl.present('Error loading data', 'danger');
      },
    });
  }

  private async getBeds() {
    this.bedsService.findBeds().subscribe({
      next: (beds) => {
        this.bedData.next(beds);
      },
      error: (error) => {
        this.loading.loading = false;
        console.error(error);
        this.toastCtrl.present('Error loading data', 'danger');
      },
    });
  }

  private async getConfiguration(id: string) {
    this.boardService
      .getConfigurationsForBoard({
        id,
      })
      .subscribe({
        next: (configurations) => {
          this.configurationData.next(configurations);
        },
        error: (error) => {
          this.loading.loading = false;
          console.error(error);
          this.toastCtrl.present('Error loading data', 'danger');
        },
      });
  }

  async save() {
    if (!this.form.valid) {
      return;
    }
    const board = this.boardData.getValue();
    if (!board) {
      return;
    }
    try {
      await lastValueFrom(
        this.boardService.updateBoard({
          id: board.id,
          body: {
            bed_id: this.form.value.bedId,
            name: this.form.value.name,
          },
        })
      );
      this.toastCtrl.present('Changes saved successfully', 'success');
    } catch (error) {
      console.error(error);
      this.toastCtrl.present('There was an error while saving.', 'danger');
    }
  }
}
