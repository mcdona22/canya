import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Level } from './message-type';
import { UiMessageComponent } from './ui-message.component/ui-message.component';

@Injectable({
  providedIn: 'root',
})
export class UiMessageService {
  private snackBar = inject(MatSnackBar);

  private show(
    message: string,
    title: string = '',
    level: Level = 'success',
    duration: number = 5000,
  ) {
    const config: MatSnackBarConfig = {
      duration,
      panelClass: [`custom-snackbar`, `feedback-${level}`],
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: {
        level,
        title: title.length == 0 ? level : title,
        message,
      },
    };
    this.snackBar.openFromComponent(UiMessageComponent, config);
  }

  success(message: string, title: string = '', duration: number = 3000) {
    this.show(message, title, 'success', duration);
  }

  error(message: string, title?: string, duration?: number): void {
    this.show(message, title, 'error', duration);
  }

  warning(message: string, title?: string, duration?: number): void {
    this.show(message, title, 'warning', duration);
  }

  info(message: string, title?: string, duration?: number): void {
    this.show(message, title, 'info', duration);
  }
}
