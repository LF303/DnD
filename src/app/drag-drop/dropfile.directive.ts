import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[fileDrop]'
})
export class DropfileDirective {

  @Output() uploadProgress = new EventEmitter<any>();
  @Output() fileDrop = new EventEmitter<File[]>();
  @Output() uploadSuccess = new EventEmitter<any>();

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('dragover', ['$event'])
  onDragOver($event) {
    $event.stopPropagation();
    $event.preventDefault();
    $event.dataTransfer.dropEffect = 'copy';
    this.renderer.addClass(this.el.nativeElement, 'dragover');
    this.renderer.removeClass(this.el.nativeElement, 'drop');
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.renderer.removeClass(this.el.nativeElement, 'dragover');
  }

  @HostListener('window:drop', ['$event'])
  onDrop($event) {
    $event.stopPropagation();
    $event.preventDefault();
    const { files } = $event.dataTransfer;
    if (/\.(jpe?g|png|gif)$/i.test(files[0].name)) {
      const imageUrl = URL.createObjectURL(files[0]);
      this.renderer.setAttribute(this.el.nativeElement, 'src', imageUrl);
      this.renderer.removeClass(this.el.nativeElement, 'dragover');
    }
    this.renderer.addClass(this.el.nativeElement, 'drop');
  }
}
