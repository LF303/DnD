import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;

  @HostBinding('attr.touch-action') touchAction = 'none';

  @Output() dragStart = new EventEmitter();
  @Output() dragEnd = new EventEmitter();
  @Output() isDragging = new EventEmitter();

  private isPointerDown = false;

  @HostListener('pointerdown', ['$event'])
  onPointerDown($event: PointerEvent): void {
    this.isPointerDown = true;
    this.dragStart.next($event);
  }

  @HostListener('pointerup', ['$event'])
  onPointerUp($event: PointerEvent): void {
    if (this.isPointerDown) {
      this.dragEnd.next($event);
      this.isPointerDown = false;
    }
  }

  @HostListener('pointermove', ['$event'])
  onPointerMove($event: PointerEvent): void {
    if (this.isPointerDown) {
      this.isDragging.next($event);
    }
  }
}
