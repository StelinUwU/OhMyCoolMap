import { ChangeEvent, useContext, useRef } from 'react';
import { PlacesContext, UiContext } from '../context';
import { SearchResult } from './SearchResult';

export const SearchBar = () => {
  const debounceRef = useRef<NodeJS.Timeout>();
  const { searchPlacesByQuery } = useContext(PlacesContext);
  const { setResultsStatus } = useContext(UiContext);

  const handleFocus = () => {
    setResultsStatus(true);
  };

  const onQueryChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchPlacesByQuery(e.target.value);
    }, 500);
  };

  return (
    <div className="fixed z-50 sm:right-1 top-4">
      <div className="flex flex-col items-center ">
        <div className="bg-dark flex  w-screen sm:w-96 justify-center p-3 items-center  rounded-lg ">
          <input
            className="bg-hard-color rounded-full w-full p-2 text-light-color  outline-none"
            type="text"
            placeholder="Where do you want to go?"
            onChange={onQueryChange}
            onFocus={handleFocus}
          />
          <i className="fa fa-search -ml-5 text-light-color "></i>
        </div>
        <SearchResult />
      </div>
    </div>
  );
};
