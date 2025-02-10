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
        const cleanedText = this.removeMarkup(message.text).trim();
        if (!cleanedText) return;

        const prefix = message.fromUser ? 'HUMAN: ' : 'LIA: ';
        const text = prefix + cleanedText;
        const lines = doc.splitTextToSize(text, 180);

        lines.forEach((line: string) => {
          if (yPosition + lineHeight > 280) {
            doc.addPage();
            yPosition = 20;
          }

          doc.text(line.trim(), 15, yPosition);
          yPosition += lineHeight;
        });

        yPosition += 5;
      });

    doc.save('conversation.pdf');
  }

  private removeMarkup = (text: string): string => {
    // Remove HTML tags
    let cleaned = text.replace(/<[^>]*>?/gm, '');
    // Remove Markdown formatting (headers, bold, italic, links, etc.)
    cleaned = cleaned
      .replace(/^#+\s+/gm, '')          // Headers
      .replace(/\*\*|\_\_/g, '')        // Bold
      .replace(/\*|\_/g, '')            // Italic
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // Links
      .replace(/`{3}[\s\S]*?`{3}/gm, '') // Code blocks
      .replace(/`/g, '')                // Inline code
      .replace(/~{2}/g, '')             // Strikethrough
      .replace(/>{1}/g, '');            // Blockquotes
    return cleaned;
  };
}
