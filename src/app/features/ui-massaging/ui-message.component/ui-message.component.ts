import {
  Component,
  Inject,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { NgClass } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

interface SnackBarData {
  title: string;
  message: string;
  className: string;
  level: string;
  icon: string;
}

@Component({
  selector: 'ui-message.component',
  standalone: true,
  imports: [
    MatIcon,
    MatSnackBarModule,
    NgClass,
    MatDivider,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './ui-message.component.html',
  styleUrl: './ui-message.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UiMessageComponent implements OnInit {
  snackbarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  snackData: Partial<SnackBarData> = {};

  iconMap: { [key: string]: string } = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };

  ngOnInit(): void {
    this.snackData = {
      ...this.data,
      className: `feedback-${this.data.level}`,
      icon: this.iconMap[this.data.level!] || '',
    };
  }

  closeSnack() {
    this.snackbarRef.dismiss();
  }
}
