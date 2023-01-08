import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
import { PlantDto } from '../../api/models';
import { PlantsService } from '../../api/services';
import { loadingHelper, LoadingService } from '../../loading.service';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'rooftop-plants-settings',
  templateUrl: './plants-settings.component.html',
  styleUrls: ['./plants-settings.component.scss'],
})
export class PlantsSettingsPage implements OnInit {
  private plants = new BehaviorSubject<PlantDto[] | null>(null);
  searchControl = new FormControl<string>('');
  filteredPlants = new BehaviorSubject<PlantDto[] | null>(null);

  constructor(
    private readonly plantsService: PlantsService,
    private readonly loading: LoadingService,
    private readonly toast: ToastService,
    public readonly translate: TranslateService
  ) {}

  ngOnInit(): void {
    loadingHelper([this.plants]).subscribe({
      next: (loading) => (this.loading.loading = loading),
      error: (error) => {
        console.error(error);
        this.loading.loading = false;
      },
    });

    combineLatest([
      this.plants,
      this.searchControl.valueChanges.pipe(
        startWith(''),
        map((value) => value?.toLowerCase())
      ),
    ]).subscribe(([plants, search]) => {
      const filteredBoards =
        plants?.filter((plant) =>
          plant.name_de.toLowerCase().includes(search ?? '') ||
          plant.name_en.toLowerCase().includes(search ?? '')
        ) ?? null;
      this.filteredPlants.next(filteredBoards);
    });
  }

  private loadPlants() {
    this.plantsService.findAllPlants().subscribe({
      next: (plants) => this.plants.next(plants),
      error: (error) => {
        console.error(error);
        this.loading.loading = false;
        this.toast.present('Error loading data', 'danger');
      },
    });
  }

  ionViewWillEnter() {
    this.loadPlants();
  }
}
