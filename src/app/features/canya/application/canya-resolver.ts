// import { ResolveFn, Router } from '@angular/router';
// import { CanyaEvent } from '../data/CanyaEvent';
// import { inject } from '@angular/core';
// import { CanyaService } from './canya-service';
// import { catchError, EMPTY } from 'rxjs';
// import { UiMessageService } from '../../ui-massaging/ui-message-service';
// import { canyasBasePath } from '../../../routing/app-routes';
//
// export const canyaResolver: ResolveFn<CanyaEvent> = (route, state) => {
//   const canyaService = inject(CanyaService);
//   const messagingService = inject(UiMessageService);
//   const router = inject(Router);
//   const canyaId = route.params['id'];
//   console.log(`Resolving the canya for ${canyaId}`);
//
//   return canyaService.watchCanya(canyaId).pipe(
//     catchError((err) => {
//       console.log(
//         `Canya Resolver: An error occurred resolving ${canyaId}`,
//         err,
//       );
//       messagingService.error(
//         `Can not navigate to a canya with the id of ${canyaId}`,
//         'Canya not found',
//       );
//       router.navigate([canyasBasePath]).then();
//       return EMPTY;
//     }),
//   );
// };
