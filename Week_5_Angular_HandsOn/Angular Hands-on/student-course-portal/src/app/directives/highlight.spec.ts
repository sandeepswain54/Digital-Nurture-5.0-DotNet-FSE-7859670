import { ElementRef } from '@angular/core';
import { Highlight } from './highlight';

describe('Highlight', () => {
  it('should create an instance', () => {
    const elementRef = new ElementRef(document.createElement('div'));
    const directive = new Highlight(elementRef);
    expect(directive).toBeTruthy();
  });
});
