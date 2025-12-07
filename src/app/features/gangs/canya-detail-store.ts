import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type CanyaDetailState = {
  id: string;
};

const initialState: CanyaDetailState = {
  id: '',
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
);
