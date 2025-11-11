import { Component } from '@angular/core';

@Component({
  selector: 'app-gangs',
  imports: [],
  templateUrl: './gangs.html',
  styleUrl: './gangs.scss',
})
export class Gangs {
  private randomKey = () =>
    Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}
