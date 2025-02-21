import {Injectable, signal} from '@angular/core';
import {FrontErrorType, FrontError} from "../interface/error";


@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private readonly _error = signal<FrontError>({ name: '', message: '', show: false });
  readonly error = this._error.asReadonly();

  public transformError(status: number): FrontError {
    switch (status) {
      case 400:
        return new FrontError('invalid_request');
      case 401:
        return new FrontError('unauthorized');
      case 403:
        return new FrontError('forbidden');
      case 404:
        return new FrontError('not_found');
      case 429:
        return new FrontError('too_many_requests');
      case 500:
        return new FrontError('server_error');
      default:
        return new FrontError('unexpected');
    }
  }

  showError(messageKey: FrontErrorType, params?: Record<string, string>): void {
    this._error.set({ messageKey, params, show: true } as FrontError);

    setTimeout(() => {
      this.hideError();
    }, 10000);
  }

  hideError(): void {
    this._error.set({ name: '', message: '', show: false });
  }
}
