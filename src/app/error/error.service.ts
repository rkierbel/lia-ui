import {Injectable, signal} from '@angular/core';
import {ErrorState, ErrorType} from "../interface/error";


@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private readonly _error = signal<ErrorState>({ show: false });
  readonly error = this._error.asReadonly();

  showError(messageKey: ErrorType, params?: Record<string, string>): void {
    this._error.set({ messageKey, params, show: true });

    setTimeout(() => {
      this.hideError();
    }, 10000);
  }

  hideError(): void {
    this._error.set({ show: false });
  }
}
