import { Directive, OnInit } from '@angular/core';
import { DragDirective } from './drag.directive';
import { fromEvent, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appMove]'
})
export class MoveDirective extends DragDirective implements OnInit {
  private pointerDown$: Observable<Event>;
  private pointerUp$: Observable<Event>;
  private move$: Observable<Event>;

  ngOnInit() {
    this.initPointerDown();
    this.initPointerUp();
    this.initMoveEvent();
  }

  private initPointerDown() {
    this.pointerDown$ = fromEvent(document, 'pointerdown');
  }

  private initPointerUp() {
    this.pointerUp$ = fromEvent(document, 'pointerup');
  }

  private initMoveEvent() {
    this.move$ = fromEvent(document, 'isDragging').pipe(
      takeUntil(this.pointerUp$)
    );
  }
}
