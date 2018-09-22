import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('Image') image: ElementRef;

  logEvent($event: PointerEvent) {
    console.log($event);
  }

  setImage(files: File[]) {

  }
}
