import { Component, input } from '@angular/core';
import { AppUser } from '../../data/app-user';

@Component({
  selector: 'app-user-avatar',
  imports: [],
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.scss',
})
export class UserAvatar {
  appUser = input.required<AppUser>();
}
