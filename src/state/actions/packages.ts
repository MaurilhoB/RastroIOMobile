import { createAction } from 'redux-actions';

export interface TrackEvent {
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

export interface ICreateAction {
  title: string;
  code: string;
}

export interface IDropAction {
  id: string;
}

export interface IUpdateAction {
  id: string;
  title: string;
  code: string;
  events: TrackEvent[];
  updated_at: string;
  hasUpdate: boolean;
}

const create = createAction<ICreateAction>('CREATE_PACKAGE');

const drop = createAction<IDropAction>('DELETE_PACKAGE');

const update = createAction<IUpdateAction>('UPDATE_PACKAGE');

const initialdata = createAction<IPackages>('INITIAL_DATA');

export { create, drop, update, initialdata };
