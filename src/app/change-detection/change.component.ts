import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'change-detection',
  template: `
    Counter: {{ counter }} Calculated value: {{ calculateValue() }}
    <button (click)="doNothing()" (mouseover)="doNothing()">do nothing</button>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ChangeDetectionComponent {
  counter = 0;

  // readonly changeDetector = inject(ChangeDetectorRef);

  calculateValue = () => {
    console.log('change detected...');
    return 42;
  };

  doNothing() {}

  constructor() {
    setInterval(() => {
      this.counter++;
      console.log('counter: ', this.counter);
    }, 1000);

    // setInterval(() => this.changeDetector.detectChanges(), 5000);
  }
}
