import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PlantsService } from '../../../api/services';
import { LoadingService } from '../../../loading.service';
import { ToastService } from '../../../toast.service';

@Component({
  selector: 'rooftop-plant-settings',
  templateUrl: './plant-settings.component.html',
  styleUrls: ['./plant-settings.component.scss'],
})
export class PlantSettingsPage implements OnInit {
  form = this.fb.group({
    name_de: this.fb.control('', [Validators.required]),
    name_en: this.fb.control('', [Validators.required]),
    image_url: this.fb.control('', [Validators.required]),
  });

  plantId = new BehaviorSubject<string | null>(null);

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly plantsService: PlantsService,
    private readonly route: ActivatedRoute,
    private readonly loading: LoadingService,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.plantId.next(params['id']);
      }
    });

    this.plantId.subscribe((id) => {
      if (id) {
        this.loadPlantData(id);
      }
    });
  }

  private loadPlantData(id: string) {
    this.loading.loading = true;
    this.plantsService.findPlantById({ id }).subscribe({
      next: (plant) => {
        this.form.patchValue(plant);
        this.loading.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading.loading = false;
        this.toast.present('Error loading data', 'danger');
      },
    });
  }

  public onDelete() {
    if (!this.plantId.value) {
      return;
    }
    this.loading.loading = true;
    this.plantsService.deletePlant({ id: this.plantId.value }).subscribe({
      next: () => {
        this.loading.loading = false;
        this.toast.present('Plant deleted', 'success');
      },
      error: (error) => {
        console.error(error);
        this.loading.loading = false;
        this.toast.present('Error deleting plant', 'danger');
      },
    });
  }

  public save() {
    if (!this.form.valid) {
      return;
    }

    if (this.plantId.value) {
      this.updatePlant(this.plantId.value);
    } else {
      this.createPlant();
    }
  }

  private createPlant() {
    this.loading.loading = true;
    this.plantsService
      .createPlant({
        body: {
          image_url: this.form.getRawValue().image_url,
          name_de: this.form.getRawValue().name_de,
          name_en: this.form.getRawValue().name_en,
        },
      })
      .subscribe({
        next: () => {
          this.loading.loading = false;
          this.toast.present('Plant created', 'success');
        },
        error: (error) => {
          console.error(error);
          this.loading.loading = false;
          this.toast.present('Error creating plant', 'danger');
        },
      });
  }

  private updatePlant(id: string) {
    this.loading.loading = true;

    this.plantsService
      .updatePlant({
        id: id,
        body: {
          image_url: this.form.getRawValue().image_url,
          name_de: this.form.getRawValue().name_de,
          name_en: this.form.getRawValue().name_en,
        },
      })
      .subscribe({
        next: () => {
          this.loading.loading = false;
          this.toast.present('Plant updated', 'success');
        },
        error: (error) => {
          console.error(error);
          this.loading.loading = false;
          this.toast.present('Error updating plant', 'danger');
        },
      });
  }
}
