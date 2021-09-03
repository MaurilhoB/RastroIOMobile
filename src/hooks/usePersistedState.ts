import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

export const usePersistedState = <T>(
  key: string,
  initialState: T,
): Response<T> => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    (async () => {
      const storagedState = await AsyncStorage.getItem(key);

      if (storagedState) {
        setState(JSON.parse(storagedState));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem(key, JSON.stringify(state));
    })();
  }, [key, state]);

  return [state, setState];
};

export default usePersistedState;
