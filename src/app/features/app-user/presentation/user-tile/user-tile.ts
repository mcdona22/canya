import { Component, input } from '@angular/core';
import { AppUser } from '../../data/app-user';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-tile',
  imports: [MatTooltip],
  templateUrl: './user-tile.html',
  styleUrl: './user-tile.scss',
})
export class UserTile {
  appUser = input.required<AppUser>();
  showName = input(false);

  // constructor() {
  //   effect(() =>
  //     console.log(
  //       `photoUrl`,
  //       this.appUser()!.photoURL! ?? 'No url at the moment',
  //     ),
  //   );
  // }
}
