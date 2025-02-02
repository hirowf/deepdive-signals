import { Component } from '@angular/core';
import { ChangeDetectionComponent } from './change-detection/change.component';

@Component({
  selector: 'app-root',
  imports: [ChangeDetectionComponent],
  template: `<change-detection />`,
})
export class AppComponent {}
