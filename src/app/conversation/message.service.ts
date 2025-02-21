import {inject, Injectable, signal} from '@angular/core';
import {
  HttpClient,
  HttpDownloadProgressEvent,
  HttpEvent,
  HttpEventType,
  HttpHeaderResponse,
  HttpResponse
} from "@angular/common/http";
import {Message} from "../interface/message";
import {filter, map, Observable, retry, startWith, tap} from "rxjs";
import {Language} from "../morph/morph.component";
import {ErrorService} from "../error/error.service";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly http = inject(HttpClient);
  private readonly errorService = inject(ErrorService);

  private readonly _threadId = signal<string>('');
  private readonly _isFirstVisit = signal<boolean>(true);

  private readonly _completeMessages = signal<Message[]>([]);
  private readonly _messages = signal<Message[]>([]);
  private readonly _generatingInProgress = signal<boolean>(false);

  readonly threadId = this._threadId.asReadonly();
  readonly isFirstVisit = this._isFirstVisit.asReadonly();
  readonly messages = this._messages.asReadonly();
  readonly generatingInProgress = this._generatingInProgress.asReadonly();

  sendMessage(prompt: string = '', threadId: string, language?: Language): void {
    this._generatingInProgress.set(true);
    this._threadId.set(threadId);

    const userMessage  = {
      id: window.crypto.randomUUID(),
      text: prompt,
      fromUser: true
    };

    this._messages.set([...this._messages(), userMessage]);
    this._completeMessages.set([...this._completeMessages(), userMessage]);

    this.getChatResponseStream(prompt, this._threadId(), language).subscribe({
      next: (message) =>
        this._messages.set([
          ...this._completeMessages(),
          message
        ]),

      complete: () => {
        this._completeMessages.set(this._messages());
        this._generatingInProgress.set(false);
      },

      error: (error) => {
        console.log("Error caught in message stream: ", error);
        this._generatingInProgress.set(false);
        this._messages.set(this._completeMessages());
        this.handleError(error);
      }
    });
  }

  private getChatResponseStream(prompt: string,
                                threadId: string,
                                language?: Language): Observable<Message> {
    const id = window.crypto.randomUUID();

    return this.http
      .post(`${environment.apiUrl}/api/conversation`, {
        message: prompt,
        threadId,
        isNew: this.isFirstVisit(),
        userLang: language
      }, {
        responseType: 'text',
        observe: 'events',
        reportProgress: true,
        withCredentials: false
      })
      .pipe(
        retry({
          count: 3,
          delay: 1000,
          resetOnSuccess: true
        }),
        tap(e =>{
          if (e instanceof HttpHeaderResponse && e.status >= 400) {
            throw this.errorService.transformError(e.status);
          }
        }),
        filter(
          (event: HttpEvent<string>): boolean =>
            event.type === HttpEventType.DownloadProgress ||
            event.type === HttpEventType.Response
        ),
        map(
          (event: HttpEvent<string>): Message =>
            event.type === HttpEventType.DownloadProgress
              ? {
                id,
                text: (event as HttpDownloadProgressEvent).partialText!,
                fromUser: false,
                generating: true,
              }
              : {
                id,
                text: (event as HttpResponse<string>).body!,
                fromUser: false,
                generating: false,
              }
        ),
        startWith({
          id,
          text: '',
          fromUser: false,
          generating: true
        })
      );
  }

  completeFirstVisit(): void {
    this._isFirstVisit.set(false);
  }

  private handleError(error: any): void {
    const messageKey = error?.message || 'unexpected';
    this.errorService.showError(messageKey);
  }
}
