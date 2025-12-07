import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gangs',
  imports: [MatButton, RouterLink],
  templateUrl: './gangs.html',
  styleUrl: './gangs.scss',
})
export class Gangs {
  private randomKey = () =>
    Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}
