import { UiState } from './UiProvider';

type Action =
  | { type: 'SET_ RESULTS_STATUS'; payload: boolean }
  | {
      type: 'SET_ERROR_ALERT';
      payload: { isVisible: boolean; message?: string };
    };

export const UiReducer = (state: UiState, action: Action): UiState => {
  switch (action.type) {
    case 'SET_ RESULTS_STATUS':
      return { ...state, areResultsVisible: action.payload };
    case 'SET_ERROR_ALERT':
      return {
        ...state,
        errorAlert: {
          ...state.errorAlert,
          isVisible: action.payload.isVisible,
          message: action.payload.message,
        },
      };
    default:
      return state;
  }
};
