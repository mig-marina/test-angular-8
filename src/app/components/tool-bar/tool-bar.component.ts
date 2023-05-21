import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { THEMES } from 'src/app/constants/app.metadata';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit, OnDestroy {
  @Output() setTheme:EventEmitter<string> = new EventEmitter<string>();

  public templateThemes: string[] = THEMES;
  public templateThemeSet: FormControl = new FormControl('default');

  private ngUnsubscribe$ = new Subject();

  ngOnInit() {
    this.subscribeToChangeTheme();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private subscribeToChangeTheme(): void {
    this.templateThemeSet.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res: string) => {
        const updatedClasslist = `wrapper theme-${res}`;

        this.setTheme.emit(updatedClasslist)
      });
  }
}
