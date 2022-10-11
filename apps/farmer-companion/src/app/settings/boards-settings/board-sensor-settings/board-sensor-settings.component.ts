import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { BoardPinDto, SensorConfigurationDto } from '../../../api/models';
import {
  BoardPinsService,
  ConfigurationsService,
  SensorsService,
} from '../../../api/services';
import { loadingHelper, LoadingService } from '../../../loading.service';
import { ToastService } from '../../../toast.service';

@Component({
  selector: 'rooftop-board-sensor-settings',
  templateUrl: './board-sensor-settings.component.html',
  styleUrls: ['./board-sensor-settings.component.css'],
})
export class BoardSensorSettingsPage implements OnInit {
  boardId = '';
  sensorId = new BehaviorSubject<string>('');

  readonly alertOptions = {
    header:
      this.translation.instant('Select a sensor type') ??
      'Select a sensor type',
    subHeader:
      this.translation.instant('Select the type of sensor') ??
      'Select the type of sensor',
    translucent: true,
  };

  readonly sensorConfigurations = new BehaviorSubject<
    SensorConfigurationDto[] | null
  >(null);
  readonly boardPins = new BehaviorSubject<BoardPinDto[] | null>(null);

  readonly form = this.fb.nonNullable.group({
    deviceId: this.fb.nonNullable.control('', Validators.required),
    sensorId: this.fb.nonNullable.control('', Validators.required),
    pinId: this.fb.nonNullable.control('', Validators.required),
    isConnected: this.fb.nonNullable.control(false, Validators.required),
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly translation: TranslateService,
    private readonly sensorsService: SensorsService,
    private readonly boardPinsService: BoardPinsService,
    private readonly configService: ConfigurationsService,
    private readonly loadingService: LoadingService,
    private readonly fb: FormBuilder,
    private readonly toast: ToastService,
    private readonly alert: AlertController,
    private readonly navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['boardId']) {
        this.boardId = params['boardId'];
        this.form.patchValue({ deviceId: this.boardId });
      }
      if (params['sensorId']) {
        this.sensorId.next(params['sensorId']);
      }
    });
    loadingHelper([this.sensorConfigurations, this.boardPins]).subscribe(
      (loading) => {
        this.loadingService.loading = loading;
        if (!loading && this.sensorId.getValue() !== '') {
          this.getExistingSensorConfiguration();
        }
      }
    );
    this.getSensorTypes();
    this.getBoardPins();
  }

  private getSensorTypes(): void {
    this.sensorsService.findAllSensors().subscribe({
      next: (sensors) => this.sensorConfigurations.next(sensors),
      error: (err) => {
        this.loadingService.loading = false;
        this.toast.present(
          'There was an error loading the sensor types.',
          'danger'
        );
        console.error(err);
      },
    });
  }

  private getBoardPins(): void {
    this.boardPinsService.findAllBoardPins().subscribe({
      next: (pins) => {
        this.boardPins.next(pins);
      },
      error: (err) => {
        this.loadingService.loading = false;
        this.toast.present('There was an error loading the pins.', 'danger');
        console.error(err);
      },
    });
  }

  private async getExistingSensorConfiguration() {
    try {
      this.loadingService.loading = true;
      const data = await lastValueFrom(
        this.configService.findOneSensorConfiguration({
          id: this.sensorId.getValue(),
        })
      );

      if (data) {
        console.log(data);
        this.form.patchValue({
          deviceId: this.boardId,
          sensorId: data.sensor.id,
          pinId: data.boardPin.id,
          isConnected: data.isConnected,
        });
      }
    } catch (error) {
      console.error(error);
      if (error instanceof HttpErrorResponse && error.status === 404) {
        this.toast.present(
          'Sensor configuration does not exist anymore.',
          'danger'
        );
        this.navigateBack();
      } else {
        this.toast.present(
          'There was an error loading the existing configuration.',
          'danger'
        );
      }
    }
    this.loadingService.loading = false;
  }

  async save() {
    // If we have a sensor ID, update the sensor configuration and return. Otherwise create a new sensor.
    try {
      this.loadingService.loading = true;
      if (this.sensorId.getValue() !== '') {
        await this._updateSensor();
      } else {
        await this._createSensor();
      }
      this.toast.present('Changes saved successfully', 'success');
      this.loadingService.loading = false;
      this.navigateBack();
    } catch (error) {
      this.toast.present('There was an error while saving.', 'danger');
      console.error(error);
      this.loadingService.loading = false;
    }
  }

  private async _updateSensor() {
    await lastValueFrom(
      this.configService.updateSensorConfiguration({
        id: this.sensorId.getValue(),
        body: {
          deviceId: this.form.value.deviceId,
          sensorId: this.form.value.sensorId,
          pinId: this.form.value.pinId,
          isConnected: this.form.value.isConnected,
        },
      })
    );
  }

  private async _createSensor() {
    if (!this.form.valid) {
      return;
    }
    const values = this.form.getRawValue();
    await lastValueFrom(
      this.configService.createSensorConfiguration({
        body: {
          deviceId: values.deviceId,
          sensorId: values.sensorId,
          pinId: values.pinId,
          isConnected: values.isConnected,
        },
      })
    );
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
            this.deleteSensor();
          },
        },
      ],
    });

    await alert.present();
  }

  private async deleteSensor() {
    try {
      this.loadingService.loading = true;
      await lastValueFrom(
        this.configService.deleteSensorConfiguration({
          id: this.sensorId.getValue(),
        })
      );
      this.toast.present('Successfully deleted', 'success');
      this.loadingService.loading = false;
      this.navigateBack();
    } catch (error) {
      console.error(error);
      this.toast.present('There was an error while deleting.', 'danger');
      this.loadingService.loading = false;
    }
  }

  // Navigate back to the board
  private navigateBack() {
    this.navCtrl.navigateBack(['/settings', 'boards', this.boardId]);
  }
}
