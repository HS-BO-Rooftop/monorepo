import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
import { AutomationConfigDto } from '../../api/models';
import { AutomationsService } from '../../api/services';
import { loadingHelper, LoadingService } from '../../loading.service';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'rooftop-automations-settings',
  templateUrl: './automations-settings.component.html',
  styleUrls: ['./automations-settings.component.scss'],
})
export class AutomationsSettingsPage implements OnInit {
  private automations = new BehaviorSubject<AutomationConfigDto[] | null>(null);
  searchControl = new FormControl<string>('');
  filteredAutomations = new BehaviorSubject<AutomationConfigDto[] | null>(null);

  constructor(
    private readonly automationsService: AutomationsService,
    private readonly loading: LoadingService,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    loadingHelper([this.automations]).subscribe({
      next: (loading) => (this.loading.loading = loading),
      error: (error) => {
        console.error(error);
        this.loading.loading = false;
      },
    });

    combineLatest([
      this.automations,
      this.searchControl.valueChanges.pipe(
        startWith(''),
        map((value) => value?.toLowerCase())
      ),
    ]).subscribe(([automations, search]) => {
      const filteredAutomations =
        automations?.filter((automation) =>
          automation.name?.toLowerCase().includes(search || '')
        ) ?? null;

      // Sort by active 
      filteredAutomations?.sort((a, b) => a.active === b.active ? 0 : a.active ? -1 : 1)
      this.filteredAutomations.next(filteredAutomations);
    });
  }

  private loadBoards() {
    this.automationsService.getAutomations().subscribe({
      next: (automations) => this.automations.next(automations),
      error: (error) => {
        console.error(error);
        this.loading.loading = false;
        this.toast.present('Error loading data', 'danger');
      },
    });
  }

  ionViewWillEnter() {
    this.loadBoards();
  }
}
