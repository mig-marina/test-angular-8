import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DEFAULT_THEME, POLLING_INTERVAL, USER_LOGGED_MESSAGE } from './constants/app.metadata';
import { Subject, interval, of, combineLatest } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public currentMessage: string = '';
  public currentClasslist: string = `wrapper theme-${DEFAULT_THEME}`;
  public buttonTittle: string = 'LogIn';

  private testForLoggedStatus: boolean = false;
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

  public onClick(): void {
    this.testForLoggedStatus = !this.testForLoggedStatus;
    this.buttonTittle = this.testForLoggedStatus ? 'LogOut' : 'LogIn';
    this._authService.updateLoggedStatus(this.testForLoggedStatus);
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
      .subscribe((res: boolean) => {
        this._authService.updateOnlineStatus(res);
      });
  }

  private subscribeToChangeData(): void {
    combineLatest(this._authService.isUserLoggedIn$, this._authService.isUserOnline$)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(([isUserLoggedIn, isUserOnline]) => {
        this.currentMessage = isUserLoggedIn && isUserOnline ? USER_LOGGED_MESSAGE : '';
      })
  }
}
