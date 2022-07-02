import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleDestroy,
} from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class ShutdownService
  implements OnModuleDestroy, OnApplicationBootstrap
{
  private recievedShutdown = false;
  private shutdownListener$: Subject<void> = new Subject();

  onModuleDestroy() {
    console.log('Executing OnDestroy Hook');
  }

  subscribeToShutdown(shutdownFn: () => void): void {
    this.shutdownListener$.subscribe(() => shutdownFn());
  }

  onApplicationBootstrap() {
    if (this.recievedShutdown) {
      this.shutdownListener$.next();
    }
  }

  shutdown() {
    this.shutdownListener$.next();
    this.recievedShutdown = true;
  }
}
