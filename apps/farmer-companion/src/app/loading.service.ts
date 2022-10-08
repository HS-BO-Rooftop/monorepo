import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly loadingElement =
    new BehaviorSubject<HTMLIonLoadingElement | null>(null);
  private readonly isLoading = new BehaviorSubject<boolean>(false);

  set loading(value: boolean) {
    this.isLoading.next(value);
  }

  constructor(private readonly loadingCtrl: LoadingController) {
    this.init();
  }

  private async init() {
    this.loadingElement.next(await this.loadingCtrl.create());

    combineLatest([this.loadingElement, this.isLoading]).subscribe(
      async ([element, loading]) => {
        if (element === null) return;
        if (loading) {
          element.present();
        } else {
          element.dismiss();
        }
      }
    );
  }
}

export function loadingHelper(
  observables: Observable<unknown | null>[]
): Observable<boolean> {
  return combineLatest(observables).pipe(
    map((values) => {
      if (values.every((value) => value === null)) {
        return true;
      }
      if (values.every((value) => value !== null)) {
        return false;
      }
      return null;
    }),
    filter((val): val is boolean => val !== null)
  );
}
