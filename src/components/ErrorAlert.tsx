import { useContext } from 'react';
import { UiContext } from '../context/ui/UiContext';

export const ErrorAlert = () => {
  const {
    errorAlert: { message },
  } = useContext(UiContext);

  return (
    <div className="fixed bottom-0 inset-x-0">
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Oops!</strong>
        <span className="block sm:inline">{message}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
      </div>
    </div>
  );
};
