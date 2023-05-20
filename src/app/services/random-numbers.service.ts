import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { MAX_NUMBER, MIN_NUMBER, RANDOM_NUMBER_INTERVAL } from '../constants/app.metadata';

@Injectable({
  providedIn: 'root'
})
export class RandomNumbersService {
  private myNumber$: Subject<number> = new Subject<number>();

  public getNumber(): Observable<number> {
    interval(RANDOM_NUMBER_INTERVAL)
      .subscribe(() => {
        const currentRandomNumber = Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1) + MIN_NUMBER);

        this.myNumber$.next(currentRandomNumber);
    });

    return this.myNumber$.asObservable();
  }
}
