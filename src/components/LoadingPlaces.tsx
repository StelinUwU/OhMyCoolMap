export const LoadingPlaces = () => {
  return (
    <div
      className={`flex flex-col bg-dark rounded-b-xl text-light-color w-96 p-3 overflow-auto -mt-3 ease-in `}
    >
      <div className="flex flex-col items-center bg-hard-color p-3 rounded-lg m-3 text-center">
        <p className="mb-3">Loading Places....</p>
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    </div>
  );
};
