import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, map } from 'rxjs';

type Options = Record<string, string>;

@Component({
  selector: 'app-behavior-subject',
  standalone: true,
  template: `<button (click)="switchOptions()">change</button>`,
})
export class BehaviorSubjectComponent {
  readonly options = new BehaviorSubject<Options>({
    r: 'red',
    g: 'Green',
    b: 'Blue',
  });

  readonly selectedKey = new BehaviorSubject<string>('b');

  readonly selectedValue = combineLatest([this.options, this.selectedKey]).pipe(
    debounceTime(0),
    map(([options, key]) => options[key])
  );

  switchOptions() {
    this.options.next({
      m: 'Magenta',
      y: 'Yellow',
      c: 'Cyan',
    });
    this.selectedKey.next('c');
  }

  constructor() {
    this.selectedValue.subscribe(console.log);
  }
}
