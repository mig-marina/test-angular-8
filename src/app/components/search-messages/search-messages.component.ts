import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { Message } from 'src/app/interfaces/message.interface';
import { USER_MESSAGES } from 'src/app/mocks/user-messages.mock';

@Component({
  selector: 'app-search-messages',
  templateUrl: './search-messages.component.html',
  styleUrls: ['./search-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchMessagesComponent implements OnInit, OnDestroy {
  public searchControl: FormControl = new FormControl('');
  public userMessages: Message[] = USER_MESSAGES;
  public filteredUserMessage: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>(this.userMessages);

  private ngUnsubscribe$ = new Subject();

  ngOnInit() {
    this.subscribeToSearch();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private subscribeToSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this.searchMessages(value || '')),
        takeUntil(this.ngUnsubscribe$),
      ).subscribe((res: Message[]) => {
        this.filteredUserMessage.next(res);
      });
  }

  private searchMessages(keyword: string): Observable<Message[]> {
    const filterValue = keyword.toLowerCase();

    return of(this.userMessages.filter(message => message.content.toLowerCase().includes(filterValue)))
  }
}
