import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';
import { DragDirective } from './drag.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[appMove]'
})
export class MoveDirective extends DragDirective {
  private didDragStart = false;

  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }

  position: Position = {x: 0, y: 0};
  startPosition: Position = {x: 0, y: 0};

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  @HostListener('isDragging', ['$event'])
  onMove($event) {
    if (this.didDragStart) {
      this.position = {
        x: $event.clientX - this.startPosition.x,
        y: $event.clientY - this.startPosition.y,
      };
    }

  }

  @HostListener('dragStart', ['$event'])
  onDragStart($event: PointerEvent) {
      this.startPosition = {
        x: $event.clientX - this.position.x,
        y: $event.clientY - this.position.y,
      };
      this.didDragStart = true;
  }

  @HostListener('dragEnd')
  onPointerUp() {
    this.didDragStart = false;
    this.position = {x: 0, y: 0};
  }

}
