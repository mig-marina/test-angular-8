import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { POLLING_INTERVAL, USER_LOGGED_MESSAGE } from './constants/app.metadata';
import { interval, of } from 'rxjs';
import { catchError, switchMap, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public currentMessage: string = '';

  private componentActive = true;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.longPolling();
    this.subscribeToChangeData();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  private longPolling(): void {
    interval(POLLING_INTERVAL)
      .pipe(
        takeWhile(() => this.componentActive),
        switchMap((res) => this._authService.getOnlineStatus()),
        catchError(() => of(false)),
      )
      .subscribe();
  }

  private subscribeToChangeData(): void {
    this._authService.isUserLoggedIn$.pipe(takeWhile(() => this.componentActive)).subscribe((res) => {
      this.currentMessage = res ? USER_LOGGED_MESSAGE : '';
    });
  }
}
