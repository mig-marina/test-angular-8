import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';
import { GET_RANDOM_NUMBER_INTERVAL } from 'src/app/constants/app.metadata';
import { RandomNumbersService } from 'src/app/services/random-numbers.service';

@Component({
  selector: 'app-random-numbers',
  templateUrl: './random-numbers.component.html',
  styleUrls: ['./random-numbers.component.scss'],
})
export class RandomNumbersComponent implements OnInit, OnDestroy {
  public randomNumberListData: string = '';
  private randomNumberList: number[] = [];

  private ngUnsubscribe$ = new Subject();

  constructor(private _randomNumbersService: RandomNumbersService) { }

  ngOnInit() {
    this.updateRandomNumberList();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private updateRandomNumberList(): void {
    this._randomNumbersService.getNumber()
      .pipe(
        throttleTime(GET_RANDOM_NUMBER_INTERVAL),
        takeUntil(this.ngUnsubscribe$),
        )
      .subscribe((res: number) => {
        this.randomNumberList.push(res);
        this.randomNumberListData = this.randomNumberList.join(', ');
      });
  }
}
