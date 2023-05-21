import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DEFAULT_THEME, GET_RANDOM_NUMBER_INTERVAL, POLLING_INTERVAL, THEMES, USER_LOGGED_MESSAGE } from './constants/app.metadata';
import { BehaviorSubject, Observable, interval, of } from 'rxjs';
import { catchError, startWith, switchMap, takeWhile, throttleTime } from 'rxjs/operators';
import { RandomNumbersService } from './services/random-numbers.service';
import { FormControl } from '@angular/forms';
import { USER_MESSAGES } from './mocks/user-messages.mock';
import { Message } from './interfaces/message.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public currentMessage: string = '';
  public randomNumberListData: string = '';

  public searchControl: FormControl = new FormControl('');
  public userMessages: Message[] = USER_MESSAGES;
  public filteredUserMessage: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>(this.userMessages);

  public templateThemes: string[] = THEMES;
  public currentClasslist: string = `wrapper theme-${DEFAULT_THEME}`;
  public templateThemeSet: FormControl = new FormControl('default');

  private randomNumberList: number[] = [];
  private componentActive = true;

  constructor(private _authService: AuthService, private _randomNumbersService: RandomNumbersService) {}

  ngOnInit(): void {
    this.longPolling();
    this.subscribeToChangeData();
    this.updateRandomNumberList();
    this.subscribeToSearch();
    this.subscribeToChangeTheme();
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

  private subscribeToSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this.searchMessages(value || '')),
        takeWhile(() => this.componentActive),
      ).subscribe((res) => {
        this.filteredUserMessage.next(res);
      });
  }

  private searchMessages(keyword: string): Observable<Message[]> {
    const filterValue = keyword.toLowerCase();

    return of(this.userMessages.filter(message => message.content.toLowerCase().includes(filterValue)))
  }

  private subscribeToChangeTheme(): void {
    this.templateThemeSet.valueChanges
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((res: string) => {
        this.currentClasslist = `wrapper theme-${res}`;
      });
  }
}
