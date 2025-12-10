import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-gangs',
  imports: [MatButton, RouterLink, MatIconModule],
  templateUrl: './gangs.html',
  styleUrl: './gangs.scss',
})
export class Gangs {
  private randomKey = () =>
    Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}
