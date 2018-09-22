import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDirective } from './drag.directive';
import { DropfileDirective } from './dropfile.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DragDirective, DropfileDirective],
  exports: [DragDirective, DropfileDirective],
})
export class DragDropModule { }
