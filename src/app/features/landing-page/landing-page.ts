import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-landing-page',
  imports: [MatButton],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  title = input('New Canya');
}
