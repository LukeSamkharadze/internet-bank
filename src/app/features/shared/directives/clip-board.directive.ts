import {
  Directive,
  EventEmitter,
  Input,
  Output,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appClipBoard]',
})
export class ClipBoardDirective {
  @Input('appClipBoard')
  public payload: string;

  // tslint:disable-next-line:no-output-rename
  @Output('copied')
  public copied: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.preventDefault();
    if (!this.payload) {
      return;
    }

    const listener = (e: ClipboardEvent) => {
      const clipboard = e.clipboardData;
      clipboard.setData('text', this.payload.toString());
      e.preventDefault();
      this.copied.emit(this.payload);
    };

    document.addEventListener('copy', listener, false);
    document.execCommand('copy');
    document.removeEventListener('copy', listener, false);
  }
}
