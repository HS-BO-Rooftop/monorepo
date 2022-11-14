import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter } from 'rxjs';
import { UserDto } from '../../../api/models';
import { UserService } from '../../../api/services';
import { LoadingService } from '../../../loading.service';
import { ToastService } from '../../../toast.service';

@Component({
  selector: 'rooftop-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsPage implements OnInit {
  userId = new BehaviorSubject<string | null>(null);
  userData = new BehaviorSubject<UserDto | null>(null);

  form = this.fb.group({
    email: this.fb.nonNullable.control('', Validators.required),
    firstName: this.fb.nonNullable.control('', Validators.required),
    lastName: this.fb.nonNullable.control('', Validators.required),
    password: this.fb.nonNullable.control('', Validators.required),
    id: this.fb.control(''),
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly usersService: UserService,
    private readonly loading: LoadingService,
    private readonly toast: ToastService,
    private readonly fb: FormBuilder,
    private readonly navCtrl: NavController,
    private readonly alert: AlertController,
    private readonly translation: TranslateService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId.next(params['userId'] || null);
    });

    this.userId.subscribe((id) => {
      if (id) {
        // Set password to be optional
        this.form.get('password')?.setValidators(null);
        this.loadUserData(id);
      }
    });

    this.userData
      .pipe(filter((data): data is UserDto => data !== null))
      .subscribe((data) => this.form.patchValue(data));
  }

  private loadUserData(id: string) {
    this.loading.loading = true;
    this.usersService.getUserById({ id }).subscribe({
      next: (user) => {
        this.userData.next(user), (this.loading.loading = false);
      },
      error: (error) => {
        console.log(error);
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
            this.deleteUser();
          },
        },
      ],
    });

    await alert.present();
  }

  private deleteUser() {
    const id = this.form.getRawValue().id;
    if (!id) {
      return;
    }
    this.loading.loading = true;
    this.usersService.deleteUser({ id }).subscribe({
      next: () => {
        this.loading.loading = false;
        this.toast.present('Successfully deleted', 'success');
        this.navigateBack();
      },
      error: (error) => {
        this.loading.loading = false;
        console.log(error);
        this.toast.present('There was an error while deleting.', 'danger');
      },
    });
  }

  save() {
    this.loading.loading = true;
    if (this.userId.getValue() === null) {
      this.create().subscribe({
        next: () => {
          this.toast.present('Successfully created', 'success');
          this.navigateBack();
        },
        error: (error) => {
          console.log(error);
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
          console.log(error);
          this.toast.present('There was an error while saving.', 'danger');
        },
        complete: () => (this.loading.loading = false),
      });
    }
  }

  private create() {
    return this.usersService.createUser({
      body: {
        email: this.form.getRawValue().email,
        firstName: this.form.getRawValue().firstName,
        lastName: this.form.getRawValue().lastName,
        password: this.form.getRawValue().password,
      },
    });
  }

  private update() {
    const id = this.form.getRawValue().id;
    if (!id) {
      return;
    }
    return this.usersService.updateUser({
      id,
      body: {
        firstName: this.form.getRawValue().firstName,
        lastName: this.form.getRawValue().lastName,
        // Only update password if it is not empty
        password: this.form.getRawValue().password
          ? this.form.getRawValue().password
          : undefined,
      },
    });
  }

  // Navigate back to the board
  private navigateBack() {
    this.navCtrl.navigateBack('/settings/users');
  }
}
