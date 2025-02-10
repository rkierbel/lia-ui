import {Injectable} from '@angular/core';
import {jsPDF} from 'jspdf';
import {Message} from '../interface/message';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  exportToPdf(messages: Message[]): void {
    const doc = new jsPDF();
    doc.setFontSize(11);
    const lineHeight = 5;
    let yPosition = 20;

    messages
      .filter(m => m.text.trim().length > 0)
      .forEach(message => {
        const prefix = message.fromUser ? 'HUMAN: ' : 'LIA: ';
        const text = prefix + message.text;
        const lines = doc.splitTextToSize(text, 180);

        lines.forEach((line: string) => {
          if (yPosition + lineHeight > 280) {
            doc.addPage();
            yPosition = 20;
          }

          doc.text(line, 15, yPosition);
          yPosition += lineHeight;
        });

        yPosition += 5;
      });

    doc.save('conversation.pdf');
  }
}
