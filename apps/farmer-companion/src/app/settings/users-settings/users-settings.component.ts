import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
import { UserDto } from '../../api/models';
import { UsersService } from '../../api/services';
import { LoadingService, loadingHelper } from '../../loading.service';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'rooftop-users-settings',
  templateUrl: './users-settings.component.html',
  styleUrls: ['./users-settings.component.scss'],
})
export class UsersSettingsPage implements OnInit {
  public readonly searchControl = new FormControl('', { nonNullable: true });
  public readonly filteredUsers = new BehaviorSubject<UserDto[]>([]);

  private users = new BehaviorSubject<UserDto[]>([]);

  constructor(
    private readonly loading: LoadingService,
    private readonly toast: ToastService,
    private readonly usersService: UsersService
  ) {}

  ngOnInit(): void {
    loadingHelper([this.users]).subscribe(
      (loading) => (this.loading.loading = loading)
    );
    this.loadUsers();

    combineLatest([
      this.users,
      this.searchControl.valueChanges.pipe(
        startWith(''),
        map((search) => search.trim().toLocaleLowerCase())
      ),
    ]).subscribe(([users, search]) => {
      const filteredUsers =
        users?.filter(
          (user) =>
            user.firstName.trim().toLowerCase().includes(search) ||
            user.lastName.trim().toLowerCase().includes(search)
        ) ?? users;
      this.filteredUsers.next(filteredUsers);
    });
  }

  ionViewWillEnter() {
    this.loadUsers();
  }

  private loadUsers() {
    this.usersService.getAllUser().subscribe({
      next: (users) => this.users.next(users),
      error: (error) => {
        console.error(error);
        this.loading.loading = false;
        this.toast.present('Error loading data', 'danger');
      },
    });
  }
}
