import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CanyaService } from '../../application/canya-service';
import { UserTile } from '../../../app-user/presentation/user-tile/user-tile';
import { TimeSlot } from '../time-slot/time-slot';

@Component({
  selector: 'app-canya-detail',
  imports: [UserTile, TimeSlot],
  templateUrl: './canya-detail.html',
  styleUrl: './canya-detail.scss',
})
export class CanyaDetail implements OnInit {
  route = inject(ActivatedRoute);
  canyaService = inject(CanyaService);
  readonly imagePath = 'images/create-club.jpg';

  canyaId = signal<string | undefined>(undefined);
  canya = this.canyaService.watchCanya(this.canyaId);
  userIds = computed(() => this.canya()?.canyaUsers() ?? []);
  users = this.canyaService.canyaUsers(this.userIds);
  canyaOwner = computed(() =>
    this.users().find((u) => u.id == this.canya()?.ownerId),
  );

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.canyaId.set(id);
    console.log(`Canya Id is ${this.canyaId()}`);
  }
}
