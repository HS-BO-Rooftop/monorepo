import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
import { BedDto } from '../../api/models';
import { BedsService } from '../../api/services';
import { loadingHelper, LoadingService } from '../../loading.service';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'rooftop-beds-settings',
  templateUrl: './beds-settings.component.html',
  styleUrls: ['./beds-settings.component.scss'],
})
export class BedsSettingsPage implements OnInit {
  private beds = new BehaviorSubject<BedDto[] | null>(null);
  filteredBeds = new BehaviorSubject<BedDto[] | null>(null);
  searchControl = new FormControl<string>('', { nonNullable: true });

  constructor(
    private readonly loading: LoadingService,
    private readonly toast: ToastService,
    private readonly bedsService: BedsService
  ) {}

  ngOnInit(): void {
    loadingHelper([this.beds]).subscribe(
      (loading) => (this.loading.loading = loading)
    );
    this.loadBeds();

    combineLatest([
      this.beds,
      this.searchControl.valueChanges.pipe(
        startWith(''),
        map((search) => search.trim().toLocaleLowerCase())
      ),
    ]).subscribe(([beds, search]) => {
      const filteredBeds =
        beds?.filter((bed) => bed.name.trim().toLowerCase().includes(search)) ??
        beds;
      this.filteredBeds.next(filteredBeds);
    });
  }

  ionViewWillEnter() {
    this.loadBeds();
  }

  private loadBeds() {
    this.bedsService.findBeds().subscribe({
      next: (beds) => this.beds.next(beds),
      error: (error) => {
        console.error(error);
        this.loading.loading = false;
        this.toast.present('Error loading data', 'danger');
      },
    });
  }
}
