import { ResolveFn } from '@angular/router';

export const detailResolver: ResolveFn<string> = (route, state) => {
  const id = route.params['id'];
  console.log(`Resolved the id param`, id);

  return id;
};
