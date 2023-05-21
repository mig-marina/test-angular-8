import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DEFAULT_THEME, POLLING_INTERVAL, USER_LOGGED_MESSAGE } from './constants/app.metadata';
import { Subject, interval, of } from 'rxjs';
import { catchError, switchMap, takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public currentMessage: string = '';
  public currentClasslist: string = `wrapper theme-${DEFAULT_THEME}`;

  private ngUnsubscribe$ = new Subject();

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.longPolling();
    this.subscribeToChangeData();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public setTheme(classList: string): void {
    this.currentClasslist = classList;
  }

  private longPolling(): void {
    interval(POLLING_INTERVAL)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        switchMap(() => this._authService.getOnlineStatus()),
        catchError(() => of(false)),
      )
      .subscribe();
  }

  private subscribeToChangeData(): void {
    this._authService.isUserLoggedIn$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res) => {
        this.currentMessage = res ? USER_LOGGED_MESSAGE : '';
      });
  }
}
