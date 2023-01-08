import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Color } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toast?: HTMLIonToastElement;
  private messageQueue = new BehaviorSubject<ToastConfig[]>([]);

  constructor(
    private readonly toastCtrl: ToastController,
    private readonly translate: TranslateService
  ) {
    this.workQueue();
  }

  // Add message in queue
  async present(message: string, color: Color) {
    this.messageQueue.next([...this.messageQueue.value, { message, color }]);
  }

  private async workQueue() {
    // Keep presenting messages until queue is empty
    this.messageQueue.subscribe(async (messages) => {
      if (messages.length === 0) return;
      // Dismiss current toast
      if (this.toast) await this.toast.dismiss();
      this.toast = await this.toastCtrl.create({
        duration: 4000,
        message:
          this.translate.instant(messages[0].message) ?? messages[0].message,
        color: messages[0].color,
      });
      await this.toast.present();
      // Timeout 3s before display next message
      timer(4000).subscribe(() => {
        const next = this.messageQueue.getValue().slice(1);
        this.messageQueue.next(next);
      });
    });
  }
}

type ToastConfig = {
  color: Color;
  message: string;
};
