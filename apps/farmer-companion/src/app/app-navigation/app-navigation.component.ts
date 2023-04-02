import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppAuthService } from '../../auth.service';

@Component({
  selector: 'rooftop-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.scss'],
})
export class AppNavigationComponent implements OnInit {
  constructor(
    private readonly _authService: AppAuthService, private readonly _router: Router) {}

  ngOnInit(
  ): void {}

  logout() {
    this._authService.logout();
    this._router.navigate(['/landing']);
  }
}
