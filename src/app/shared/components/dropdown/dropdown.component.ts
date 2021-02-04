import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef,
  AfterContentInit,
  ContentChild,
  Directive,
} from '@angular/core';

@Component({
  selector: 'app-shared-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, AfterViewInit {
  selectedRef: Element;

  constructor(private thisComponent: ElementRef) {}

  isOptionsOpened = true;

  ngAfterViewInit() {
    this.selectedRef = (this.thisComponent
      .nativeElement as Element).getElementsByClassName('content')[0];

    (this.thisComponent.nativeElement as Element)
      .querySelectorAll('.option')
      .forEach((o) =>
        o.addEventListener('click', () => {
          this.selectedRef.innerHTML = o.outerHTML;
        })
      );
  }

  ngOnInit(): void {}
}
