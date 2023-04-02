import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
import { SensorConfigurationDto } from '../../api/models';
import { SensorsService } from '../../api/services';
import { loadingHelper, LoadingService } from '../../loading.service';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'rooftop-sensors-settings',
  templateUrl: './sensors-settings.component.html',
  styleUrls: ['./sensors-settings.component.scss'],
})
export class SensorsSettingsPage implements OnInit {
  private sensors = new BehaviorSubject<GroupData[] | null>(null);
  searchControl = new FormControl<string>('');
  filteredSensors = new BehaviorSubject<GroupData[] | null>(null);

  constructor(
    private readonly sensorsService: SensorsService,
    private readonly loading: LoadingService,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    loadingHelper([this.sensors]).subscribe({
      next: (loading) => (this.loading.loading = loading),
      error: (error) => {
        console.error(error);
        this.loading.loading = false;
      },
    });

    combineLatest([
      this.sensors,
      this.searchControl.valueChanges.pipe(
        startWith(''),
        map((value) => value?.toLowerCase())
      ),
    ]).subscribe(([sensors, search]) => {
      const filtered = sensors?.filter(
        (x) =>
          x.name.toLowerCase() === search ||
          x.sensors.filter((y) => y.name.toLowerCase() === search)
      );
      this.filteredSensors.next(filtered ?? null);
    });
  }

  private loadBoards() {
    this.sensorsService.findAllSensors().subscribe({
      next: (sensors) => this.sensors.next(this.groupSensorsByType(sensors)),
      error: (error) => {
        console.error(error);
        this.loading.loading = false;
        this.toast.present('Error loading data', 'danger');
      },
    });
  }

  private groupSensorsByType(sensors: SensorConfigurationDto[]) {
    return sensors.reduce((acc, sensor) => {
      const type = sensor.sensorType.name;
      const group = acc.find((x) => x.name === type);
      if (group) {
        group.sensors.push(sensor);
      } else {
        acc.push({
          name: type,
          sensors: [sensor],
        });
      }
      return acc;
    }, [] as GroupData[]);
  }

  ionViewWillEnter() {
    this.loadBoards();
  }
}

interface GroupData {
  name: string;
  sensors: SensorConfigurationDto[];
}
