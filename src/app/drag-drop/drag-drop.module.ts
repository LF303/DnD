import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDirective } from './drag.directive';
import { DropfileDirective } from './dropfile.directive';
import { MoveDirective } from './move.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DragDirective, DropfileDirective, MoveDirective],
  exports: [DragDirective, MoveDirective, DropfileDirective],
})
export class DragDropModule { }
