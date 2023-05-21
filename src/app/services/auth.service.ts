import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isUserLoggedIn$: Observable<boolean>;
  public isUserOnline$: Observable<boolean>;

  private isUserLoggedInSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isUserOnlineSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.isUserLoggedIn$ = this.isUserLoggedInSub.asObservable();
    this.isUserOnline$ = this.isUserOnlineSub.asObservable();
  }

  public updateOnlineStatus(currentStatus: boolean): void {
    this.isUserOnlineSub.next(currentStatus);
  }

  public updateLoggedStatus(currentStatus: boolean): void {
    this.isUserLoggedInSub.next(currentStatus)
  }

  public getOnlineStatus(): Observable<boolean> {
    const currentTestValue = Math.round(Math.random());

    return of(!!currentTestValue);
  }
}
