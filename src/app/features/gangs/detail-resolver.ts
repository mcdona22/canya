import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { CanyaDetailStore } from './canya-detail-store';

export const detailResolver: ResolveFn<boolean> = (route, state) => {
  const id = route.params['id'];
  const detailStore = inject(CanyaDetailStore);
  console.log(`Creating the route resolver`, id);
  detailStore.init(id);
  console.log(`Data Store Created`);

  return true;
};
