import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, filter, shareReplay, takeUntil } from 'rxjs';
import { AppAuthService } from '../../auth.service';

@Component({
  selector: 'rooftop-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  public userId?: string;
  public isAdmin?: boolean;

  private _destroy$ = new Subject<void>();

  constructor(private readonly _authService: AppAuthService) {}

  ngOnInit(): void {
    this._authService.isAuthenticated$
      .pipe(
        takeUntil(this._destroy$),
        filter((x) => !!x),
        shareReplay(1)
      )
      .subscribe(() => {
        this.userId = this._authService.userId ?? undefined;
        this.isAdmin = this._authService.isAdmin;
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
