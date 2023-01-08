import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BedDto } from '../api/models';
import { BedsService } from '../api/services';
import { getImageUrlForBed } from '../common/get-image-url';
import { loadingHelper, LoadingService } from '../loading.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'rooftop-beds-list',
  templateUrl: './beds-list.component.html',
  styleUrls: ['./beds-list.component.scss']
})
export class BedsListPage implements OnInit {
  public readonly beds = new BehaviorSubject<BedDto[]>([]);

  public readonly getImageUrl = getImageUrlForBed;

  constructor(
    private readonly bedsService: BedsService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService
  ) { }

  ngOnInit(): void {
    loadingHelper([this.beds]).subscribe({
      next: (loading) => (this.loadingService.loading = loading),
      error: (error) => {
        console.error(error);
        this.loadingService.loading = false;
      }
    });

    this.loadBeds();
  }

  private loadBeds() {
    this.bedsService.findBeds().subscribe({
      next: (beds) => this.beds.next(beds),
      error: (error) => {
        console.error(error);
        this.loadingService.loading = false;
        this.toastService.present('Error loading data', 'danger');
      }
    });
  }
}
