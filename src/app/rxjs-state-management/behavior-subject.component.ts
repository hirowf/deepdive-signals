import { Component } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  lastValueFrom,
  map,
} from 'rxjs';

type Options = Record<string, string>;

@Component({
  selector: 'app-behavior-subject',
  standalone: true,
  template: `<button (click)="switchOptions()">change</button>`,
})
export class BehaviorSubjectComponent {
  readonly a$ = new BehaviorSubject<number>(1);
  readonly b$ = new BehaviorSubject<number>(2);

  readonly sum$ = combineLatest([this.a$, this.b$]).pipe(
    map(([a, b]) => a + b)
  );

  async incA() {
    // only increment A if A + B is less than 10

    const sum = await lastValueFrom(this.sum$);

    if (sum < 10) {
      this.a$.next(this.a$.value + 1);
    }
  }

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
