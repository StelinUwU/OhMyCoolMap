import { createContext } from 'react';

interface UiContextProps {
  areResultsVisible: boolean;
  errorAlert: {
    isVisible: boolean;
    message?: string;
  };
  setResultsStatus: (status: boolean) => void;
  setErrorAlert: (message: string) => void;
  hideErrorAlert: () => void;
}

export const UiContext = createContext<UiContextProps>({} as UiContextProps);
