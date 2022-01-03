import { useReducer } from 'react';
import { UiContext } from './UiContext';
import { UiReducer } from './UiReducer';

export interface UiState {
  areResultsVisible: boolean;
  errorAlert: {
    isVisible: boolean;
    message?: string;
  };
}

const INITIAL_STATE: UiState = {
  areResultsVisible: true,
  errorAlert: {
    isVisible: false,
  },
};

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const UiProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(UiReducer, INITIAL_STATE);

  const setResultsStatus = (status: boolean) => {
    dispatch({
      type: 'SET_ RESULTS_STATUS',
      payload: status,
    });
  };

  const setErrorAlert = (message: string) => {
    dispatch({
      type: 'SET_ERROR_ALERT',
      payload: {
        isVisible: true,
        message,
      },
    });
  };

  const hideErrorAlert = () => {
    dispatch({
      type: 'SET_ERROR_ALERT',
      payload: {
        isVisible: false,
      },
    });
  };

  return (
    <UiContext.Provider
      value={{ ...state, setResultsStatus, setErrorAlert, hideErrorAlert }}
    >
      {children}
    </UiContext.Provider>
  );
};
