import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, filter, takeUntil } from 'rxjs';
import { AppAuthService } from '../../auth.service';
import { LinkSliderOptions } from '../widgets/link-slider/link-slider.component';

@Component({
  selector: 'rooftop-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  linkCards: LinkSliderOptions = [
    {
      title: 'Beds',
      imageUrl: 'assets/images/home-slider/beds.jpg',
      routerLink: ['/beds'],
    },
    {
      title: 'Watering',
      imageUrl: 'assets/images/home-slider/watering.jpg',
      routerLink: ['/watering'],
      disabled: true,
    },
    {
      title: 'Sensors',
      imageUrl: 'assets/images/home-slider/sensors.jpg',
      routerLink: ['/sensors'],
      disabled: true,
    },
  ];

  private _name$ = new BehaviorSubject<string | null>(null);
  public readonly name$ = this._name$.asObservable();
  private destroy$ = new Subject<void>();

  constructor(
    private readonly _authService: AppAuthService,
  ) {}

  ngOnInit(): void {
    this._authService
      .isAuthenticated$
      .pipe(takeUntil(this.destroy$), filter((isAuthenticated) => isAuthenticated))
      .subscribe(() => {
        this._name$.next(this._authService.userName);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  
}
