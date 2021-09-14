import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import _ from 'lodash';

import { usePackagesReducer } from '../../hooks/packages';

import axios from 'axios';
import api from '../../services/api';

import {
  Container,
  TrackingContainer,
  OptionsContainer,
  ReceivedButton,
  ArchiveButton,
  MainStatus,
  MainStatusTitle,
  Status,
  Row,
  RowText,
  Bold,
  ReceivedButtonText,
  ArchiveButtonText,
  Center,
  ErrorContainer,
  ErrorTitle,
  ErrorMessage,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

interface TrackEvent {
  data: string;
  hora: string;
  descricao: string;
  criacao: string;
  destino?: [
    {
      local: string;
      cidade: string;
      uf: string;
    },
  ];
  unidade: {
    tipounidade: string;
    cidade: string;
    uf: string;
  };
}

interface AxiosTrackResponse {
  objeto: [
    {
      categoria: string;
      evento: TrackEvent[];
    },
  ];
}

interface IPackage {
  id: string;
  title: string;
  code: string;
  events: TrackEvent[];
  updated_at: string;
  hasUpdate: boolean;
}

interface IRouteParams {
  route: {
    params: {
      package: IPackage;
    };
  };
}

const Track: React.FC<IRouteParams> = ({ route }) => {
  const navigation = useNavigation();
  const { dispatch, packagesState } = usePackagesReducer();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [events, setEvents] = useState<TrackEvent[]>([]);
  const eventsHistory = useMemo(() => events.slice(1), [events]);
  const lastEvent = useMemo(() => events[0], [events]);

  const packageData = route.params.package;

  const category = useMemo(
    () =>
      _.findKey(packagesState, packages =>
        _.some(packages, ({ id }) => id === packageData.id),
      ),
    [packagesState, packageData.id],
  );

  useEffect(() => {
    if (packageData?.hasUpdate) {
      dispatch({
        type: 'UPDATE_PACKAGE',
        payload: {
          ...packageData,
          hasUpdate: false,
        },
      });
    }

    if (category === 'archived' || category === 'delivered') {
      if (packageData?.events) {
        setEvents(packageData.events);
      }
      return;
    }

    if (packageData?.updated_at && packageData.events.length) {
      const lastUpdate = new Date(packageData.updated_at).getTime();
      const now = new Date().getTime();

      if (now - lastUpdate < 300000) {
        setEvents(packageData.events);
        return;
      }
    }

    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      try {
        if (packageData) {
          const response = await api.post<AxiosTrackResponse>(
            'rastreio',
            {
              code: packageData.code,
              type: 'LS',
            },
            { cancelToken: source.token },
          );

          if (
            response.data.objeto &&
            Array.isArray(response.data.objeto) &&
            !response.data.objeto[0].categoria.includes('ERRO')
          ) {
            setEvents(response.data.objeto[0].evento);
            dispatch({
              type: 'UPDATE_PACKAGE',
              payload: {
                ...packageData,
                events: response.data.objeto[0].evento,
                updated_at: new Date().toISOString(),
              },
            });
          } else {
            setError(true);
          }
        }
      } catch (e) {
        setError(true);

        if (axios.isCancel(e)) {
          return;
        }

        if (packageData?.events) {
          setEvents(packageData.events);
        }
      }

      setLoading(false);
    };
    fetchData();

    return () => source.cancel('Request cancelada');
  }, []);

  const receivedPackageHandle = useCallback((packageData: IPackage) => {
    dispatch({
      type: 'MOVE_PACKAGE',
      payload: {
        package: packageData,
        to: 'delivered',
      },
    });

    navigation.goBack();
  }, []);

  const archivePackageHandle = useCallback((packageData: IPackage) => {
    dispatch({
      type: 'MOVE_PACKAGE',
      payload: {
        package: packageData,
        to: 'archived',
      },
    });
    navigation.goBack();
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#7458d8" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <ErrorContainer>
          <ErrorTitle>O rastreamento não está disponível no momento</ErrorTitle>
          <ErrorMessage>
            - Verifique se o código do objeto está correto{'\n'}- O objeto pode
            demorar até 24 horas para ser rastreado no sistema do Correios.
          </ErrorMessage>
        </ErrorContainer>
      </Center>
    );
  }

  return (
    <Container>
      {events.length > 0 && (
        <TrackingContainer
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 10,
          }}>
          <OptionsContainer>
            {category === 'pending' && (
              <ReceivedButton
                onPress={() => receivedPackageHandle(packageData)}>
                <Icon name="check" color="white" size={18} />
                <ReceivedButtonText>Entregue</ReceivedButtonText>
              </ReceivedButton>
            )}
            {category !== 'archived' && (
              <ArchiveButton onPress={() => archivePackageHandle(packageData)}>
                <Icon name="archive" color="white" size={18} />
                <ArchiveButtonText>Arquivar</ArchiveButtonText>
              </ArchiveButton>
            )}
          </OptionsContainer>
          <MainStatus>
            <MainStatusTitle>Último Status do Objeto</MainStatusTitle>
            <Row>
              <RowText>
                Status: <Bold>{lastEvent.descricao}</Bold>
              </RowText>
            </Row>
            <Row>
              <RowText>
                Data: {lastEvent.data} | Hora: {lastEvent.hora}
              </RowText>
            </Row>
            <Row>
              <RowText>
                Local: {lastEvent.unidade.tipounidade} -{' '}
                {lastEvent.unidade.cidade.trim()} / {lastEvent.unidade.uf}
              </RowText>
            </Row>
            {lastEvent.destino && (
              <Row>
                <RowText>
                  Destino: {lastEvent.destino[0].local} -{' '}
                  {lastEvent.destino[0].cidade.trim()} /{' '}
                  {lastEvent.destino[0].uf}
                </RowText>
              </Row>
            )}
          </MainStatus>
          {eventsHistory.map(event => (
            <Status key={event.criacao}>
              <Row>
                <RowText>
                  Status: <Bold>{event.descricao}</Bold>
                </RowText>
              </Row>
              <Row>
                <RowText>
                  Data: {event.data} | Hora: {event.hora}
                </RowText>
              </Row>
              <Row>
                <RowText>
                  Local: {event.unidade.tipounidade} -{' '}
                  {event.unidade.cidade.trim()} / {event.unidade.uf}
                </RowText>
              </Row>
              {event.destino && (
                <Row>
                  <RowText>
                    Destino: {event.destino[0].local} -{' '}
                    {event.destino[0].cidade.trim()} / {event.destino[0].uf}
                  </RowText>
                </Row>
              )}
            </Status>
          ))}
        </TrackingContainer>
      )}
    </Container>
  );
};

export default Track;
