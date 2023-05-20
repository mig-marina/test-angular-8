import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { GET_RANDOM_NUMBER_INTERVAL, POLLING_INTERVAL, USER_LOGGED_MESSAGE } from './constants/app.metadata';
import { interval, of } from 'rxjs';
import { catchError, switchMap, takeWhile, throttleTime } from 'rxjs/operators';
import { RandomNumbersService } from './services/random-numbers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public currentMessage: string = '';
  public randomNumberListData: string = '';

  private randomNumberList: number[] = [];
  private componentActive = true;

  constructor(private _authService: AuthService, private _randomNumbersService: RandomNumbersService) {}

  ngOnInit(): void {
    this.longPolling();
    this.subscribeToChangeData();
    this.updateRandomNumberList();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  private longPolling(): void {
    interval(POLLING_INTERVAL)
      .pipe(
        takeWhile(() => this.componentActive),
        switchMap(() => this._authService.getOnlineStatus()),
        catchError(() => of(false)),
      )
      .subscribe();
  }

  private subscribeToChangeData(): void {
    this._authService.isUserLoggedIn$
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((res) => {
        this.currentMessage = res ? USER_LOGGED_MESSAGE : '';
      });
  }

  private updateRandomNumberList(): void {
    this._randomNumbersService.getNumber()
      .pipe(
        throttleTime(GET_RANDOM_NUMBER_INTERVAL),
        takeWhile(() => this.componentActive),
        )
      .subscribe((res) => {
        this.randomNumberList.push(res);
        this.randomNumberListData = this.randomNumberList.join(', ');
      });
  }
}
