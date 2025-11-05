import { useEffect, useReducer } from 'react';
import { MantineProvider, Container, Title, Grid, Loader, Text } from '@mantine/core';
import '@mantine/core/styles.css';
import { LaunchCard } from './components/LaunchCard';
import { LaunchModal } from './components/LaunchModal';
import { Launch } from './types/launch';
import styles from './App.module.css';

interface AppState {
  launches: Launch[];
  loading: boolean;
  error: string | null;
  selectedLaunch: Launch | null;
}

type AppAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Launch[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SELECT_LAUNCH'; payload: Launch }
  | { type: 'CLOSE_MODAL' };

const initialState: AppState = {
  launches: [],
  loading: true,
  error: null,
  selectedLaunch: null,
};

const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        launches: action.payload,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SELECT_LAUNCH':
      return {
        ...state,
        selectedLaunch: action.payload,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        selectedLaunch: null,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchLaunches = async () => {
      dispatch({ type: 'FETCH_START' });
      
      try {
        const response = await fetch(
          'https://api.spacexdata.com/v3/launches?launch_year=2020'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch launches');
        }
        
        const data: Launch[] = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_ERROR',
          payload: error instanceof Error ? error.message : 'An error occurred',
        });
      }
    };

    fetchLaunches();
  }, []);

  const handleSeeMore = (launch: Launch) => {
    dispatch({ type: 'SELECT_LAUNCH', payload: launch });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <MantineProvider>
      <div className={styles.container}>
        <Container size="xl" py="xl">
          <Title order={1} ta="center" mb="xl">
            SpaceX Launches 2020
          </Title>

          {state.loading && (
            <div className={styles.loader}>
              <Loader size="xl" />
            </div>
          )}

          {state.error && (
            <Text c="red" className={styles.error} size="lg">
              Error: {state.error}
            </Text>
          )}

          {!state.loading && !state.error && (
            <Grid gutter="lg">
              {state.launches.map((launch) => (
                <Grid.Col 
                  key={`${launch.flight_number}-${launch.launch_date_unix}`} 
                  span={{ base: 12, sm: 6, md: 4 }}
                >
                  <LaunchCard
                    launch={launch}
                    onSeeMore={() => handleSeeMore(launch)}
                  />
                </Grid.Col>
              ))}
            </Grid>
          )}

          {state.selectedLaunch && (
            <LaunchModal launch={state.selectedLaunch} onClose={handleCloseModal} />
          )}
        </Container>
      </div>
    </MantineProvider>
  );
}

export default App;
