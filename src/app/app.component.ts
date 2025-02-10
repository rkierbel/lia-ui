import {Component, computed, effect, inject, OnDestroy} from '@angular/core';
import {MessageService} from "./conversation/message.service";
import {FormsModule, NgForm} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {v4 as uuidv4} from 'uuid';
import {Language, MorphComponent} from "./morph/morph.component";
import {MarkdownPipe} from "./utils/markdown.pipe";
import {ErrorComponent} from "./error/error.component";
import {PdfService} from "./pdf-export/pdf.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, FormsModule, MorphComponent, NgIf, MarkdownPipe, ErrorComponent],
  template: `
    <app-error />

    @if (showStartScreen()) {
      <app-morph (start)="startConversation($event)"/>
    }
    @if (!showStartScreen()) {
      <div class="messages-container">
        @for (message of messages(); track message.id) {
          <div
            *ngIf="!(message.text === '' && message.fromUser)"
            class="message"
            [ngClass]="{
                'from-user': message.fromUser,
                generating: message.generating
            }"
            [innerHTML]="message.text | markdown"></div>
        }
      </div>

      <div class="drop-up-container">
        <ul class="export-menu">
          <li><a (click)="exportToPdf()">Export to PDF</a></li>
        </ul>
        <button class="drop-up-menu" aria-label="Drop-up menu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <form #form="ngForm" (ngSubmit)="sendMessage(form, form.value.message)">
        <input
          name="message"
          placeholder="Type a message"
          ngModel
          required
          autofocus
          [disabled]="generatingInProgress()"
        />
        <button type="submit" [disabled]="generatingInProgress() || form.invalid">
          Send
        </button>
      </form>
    }
  `,
})
export class AppComponent implements OnDestroy {
  private readonly messageService = inject(MessageService);
  private readonly pdfService = inject(PdfService);

  readonly threadId = this.messageService.threadId;
  readonly messages = this.messageService.messages;
  readonly generatingInProgress = this.messageService.generatingInProgress;
  protected readonly showStartScreen = computed(() => this.messageService.isFirstVisit());

  private readonly scrollEffect = effect(() => {
    // run this effect on every `messages` change
    this.messages();

    setTimeout(() =>
      window?.scrollTo({
        top: document?.body.scrollHeight,
        behavior: 'smooth',
      }),
    );
  });

  startConversation(language: Language): void {
    this.messageService.sendMessage('', uuidv4(), language);
    this.messageService.completeFirstVisit();
  }

  sendMessage(form: NgForm, messageText: string): void {
    this.messageService.sendMessage(messageText, this.threadId());
    form.resetForm();
  }

  exportToPdf() {
    this.pdfService.exportToPdf(this.messages());
  }

  ngOnDestroy(): void {
    this.scrollEffect.destroy();
  }
}
