import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isUserLoggedIn$: Observable<boolean>;

  private isUserLoggedInSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.isUserLoggedIn$ = this.isUserLoggedInSub.asObservable();
  }

  public getOnlineStatus(): Observable<boolean> {
    const currentTestValue = Math.round(Math.random());

    this.isUserLoggedInSub.next(!!currentTestValue);

    return this.isUserLoggedIn$;
  }
}
