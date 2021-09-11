import immer from 'immer';
import _ from 'lodash';
import uuid from 'react-native-uuid';
import { ReducerFactory } from 'redux-actions-ts-reducer';
import { create, drop, update, initialdata, move } from '../actions/packages';

interface TrackEvent {
  data: string;
  hora: string;
  descricao: string;
  criacao: string;
  unidade: {
    tipounidade: string;
    cidade: string;
    uf: string;
  };
}

interface IPackage {
  id: string;
  title: string;
  code: string;
  events: TrackEvent[];
  updated_at: string;
  hasUpdate: boolean;
}

interface IPackages {
  pending: IPackage[];
  delivered: IPackage[];
  archived: IPackage[];
}

const packagesReducer = new ReducerFactory({} as IPackages)
  .addReducer(
    create,
    (state, action): IPackages =>
      immer(state, draft => {
        draft.pending.push({
          id: uuid.v4().toString(),
          code: action.payload.code,
          title: action.payload.title,
          events: [],
          hasUpdate: false,
          updated_at: new Date().toISOString(),
        });
        return draft;
      }),
  )
  .addReducer(
    drop,
    (state, action): IPackages =>
      immer(state, draft => {
        const id = action.payload.id;

        const pendingIndex = draft.pending.findIndex(item => item.id === id);
        if (pendingIndex > -1) {
          draft.pending = draft.pending.filter(item => item.id !== id);
        }

        const deliveredIndex = draft.delivered.findIndex(
          item => item.id === id,
        );
        if (deliveredIndex > -1) {
          draft.delivered = draft.delivered.filter(item => item.id !== id);
        }

        const archivedIndex = draft.archived.findIndex(item => item.id === id);
        if (archivedIndex > -1) {
          draft.archived = draft.archived.filter(item => item.id !== id);
        }
        return draft;
      }),
  )
  .addReducer(
    update,
    (state, action): IPackages =>
      immer(state, draft => {
        const { id } = action.payload;

        const pendingIndex = draft.pending.findIndex(item => item.id === id);
        if (pendingIndex > -1) {
          draft.pending = draft.pending.map(item =>
            item.id === id ? action.payload : item,
          );
        }

        const deliveredIndex = draft.delivered.findIndex(
          item => item.id === id,
        );
        if (deliveredIndex > -1) {
          draft.delivered = draft.delivered.map(item =>
            item.id === id ? action.payload : item,
          );
        }

        const archivedIndex = draft.archived.findIndex(item => item.id === id);
        if (archivedIndex > -1) {
          draft.archived = draft.archived.map(item =>
            item.id === id ? action.payload : item,
          );
        }
        return draft;
      }),
  )
  .addReducer(move, (state, action) =>
    immer(state, draft => {
      const { payload } = action;

      const category = _.findKey(draft, item =>
        _.find(item, { id: payload.package.id }),
      ) as keyof IPackages;

      if (category && payload.to) {
        const removed = _.filter(
          draft[category],
          item => item.id !== payload.package.id,
        );
        const toInsert = _.filter(
          draft[category],
          item => item.id === payload.package.id,
        )[0];

        draft[category] = removed;

        if (toInsert) {
          draft[payload.to].push(toInsert);
        }

        return draft;
      }
    }),
  )
  .addReducer(initialdata, (_, action): IPackages => action.payload)
  .toReducer();

export default packagesReducer;
