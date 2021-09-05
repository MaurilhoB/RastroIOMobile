import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  useEffect,
  useState,
} from 'react';

import packagesReducer from '../state/reducers/packages';
import {
  ICreateAction,
  IDropAction,
  IUpdateAction,
} from '../state/actions/packages';

import { Action } from 'redux-actions';
import AsyncStorage from '@react-native-community/async-storage';

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

interface PackagesContextData {
  dispatch: Dispatch<Action<ICreateAction | IDropAction | IUpdateAction>>;
  packagesState: IPackages;
}

const PackagesContext = createContext<PackagesContextData>(
  {} as PackagesContextData,
);

const PackagesProvider: React.FC = ({ children }) => {
  const [packagesState, dispatch] = useReducer(packagesReducer, {
    pending: [],
    delivered: [],
    archived: [],
  });

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('@RastroIO:packages');
      if (data) {
        dispatch({
          type: 'INITIAL_DATA',
          payload: JSON.parse(data) as IPackages,
        });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem(
        '@RastroIO:packages',
        JSON.stringify(packagesState),
      );
    })();
  }, [packagesState]);

  return (
    <PackagesContext.Provider value={{ dispatch, packagesState }}>
      {children}
    </PackagesContext.Provider>
  );
};

export default PackagesProvider;

export function usePackagesReducer() {
  const context = useContext(PackagesContext);

  if (!context) {
    throw new Error('You can use this hook just inside PackagesProvider');
  }

  return context;
}
