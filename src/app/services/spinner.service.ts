import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private loading = false;

  get loaded(): boolean {
    return this.loading;
  }

  onRequestStarted(): void {
    this.loading = true;
  }

  onRequestFinished(): void {
    this.loading = false;
  }
}
