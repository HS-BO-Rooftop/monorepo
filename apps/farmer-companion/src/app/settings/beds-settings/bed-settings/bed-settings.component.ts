import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter } from 'rxjs';
import { BedDto } from '../../../api/models';
import { BedsService } from '../../../api/services';
import { LoadingService } from '../../../loading.service';
import { ToastService } from '../../../toast.service';

@Component({
  selector: 'rooftop-bed-settings',
  templateUrl: './bed-settings.component.html',
  styleUrls: ['./bed-settings.component.scss'],
})
export class BedSettingsPage implements OnInit {
  bedId = new BehaviorSubject<string | null>(null);
  bedData = new BehaviorSubject<BedDto | null>(null);

  form = this.fb.group({
    name: this.fb.nonNullable.control('', Validators.required),
    id: this.fb.control(''),
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bedsService: BedsService,
    private readonly loading: LoadingService,
    private readonly toast: ToastService,
    private readonly fb: FormBuilder,
    private readonly navCtrl: NavController,
    private readonly alert: AlertController,
    private readonly translation: TranslateService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bedId.next(params['bedId'] || null);
    });

    this.bedId.subscribe((id) => {
      id && this.loadBedData(id);
    });

    this.bedData
      .pipe(filter((data): data is BedDto => data !== null))
      .subscribe((data) =>
        this.form.patchValue({ name: data.name, id: data.id })
      );
  }

  private loadBedData(id: string) {
    this.loading.loading = true;
    this.bedsService.findBed({ id }).subscribe({
      next: (bed) => {
        this.bedData.next(bed), (this.loading.loading = false);
      },
      error: (error) => {
        console.error(error);
        this.loading.loading = false;
        this.toast.present('Error loading data', 'danger');
      },
    });
  }

  async onDelete() {
    const alert = await this.alert.create({
      header:
        this.translation.instant('Confirm deletion') ?? 'Confirm deletion?',
      buttons: [
        {
          text: this.translation.instant('Abort') ?? 'Abort',
          role: 'cancel',
        },
        {
          text: this.translation.instant('Delete') ?? 'Delete',
          handler: () => {
            this.delteBed();
          },
        },
      ],
    });

    await alert.present();
  }

  private delteBed() {
    const id = this.form.getRawValue().id;
    if (!id) {
      return;
    }
    this.loading.loading = true;
    this.bedsService.deleteBed({ id }).subscribe({
      next: () => {
        this.loading.loading = false;
        this.toast.present('Successfully deleted', 'success');
        this.navigateBack();
      },
      error: (error) => {
        this.loading.loading = false;
        console.error(error);
        this.toast.present('There was an error while deleting.', 'danger');
      },
    });
  }

  save() {
    this.loading.loading = true;
    if (this.bedId.getValue() === null) {
      this.create().subscribe({
        next: () => {
          this.toast.present('Successfully created', 'success');
          this.navigateBack();
        },
        error: (error) => {
          console.error(error);
          this.toast.present('There was an error while saving.', 'danger');
        },
        complete: () => (this.loading.loading = false),
      });
    } else {
      this.update()?.subscribe({
        next: () => {
          this.toast.present('Changes saved successfully', 'success');
          this.navigateBack();
        },
        error: (error) => {
          console.error(error);
          this.toast.present('There was an error while saving.', 'danger');
        },
        complete: () => (this.loading.loading = false),
      });
    }
  }

  private create() {
    return this.bedsService.createBed({
      body: {
        name: this.form.getRawValue().name,
      },
    });
  }

  private update() {
    const id = this.form.getRawValue().id;
    if (!id) {
      return;
    }
    return this.bedsService.updateBed({
      id,
      body: {
        name: this.form.getRawValue().name,
      },
    });
  }

  // Navigate back to the board
  private navigateBack() {
    this.navCtrl.navigateBack('/settings/beds');
  }
}
