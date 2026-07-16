import { Directive, ElementRef, HostListener,
         Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class Highlight {

  // Configurable highlight color
  // Default is yellow but caller can pass custom color
  @Input() appHighlight = 'yellow';

  constructor(private el: ElementRef) {}

  // @HostListener binds to host element events
  // Angular handles cleanup automatically
  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor =
      this.appHighlight;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
