import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

type CanyaDetailState = {
  id: string;
};

const initialState: CanyaDetailState = {
  id: 'no-id-provided',
};

export const CanyaDetailStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    init(id: string) {
      console.log(`Initialising the data store with`, id);
      patchState(store, (state) => {
        return { ...state, id };
      });
    },
  })),
  withHooks({
    onInit(store) {
      console.log(`Init`, `"${store.id()}"`);
    },
    onDestroy(store) {
      console.log(`Destroy`, `"${store.id()}"`);
    },
  }),
);
