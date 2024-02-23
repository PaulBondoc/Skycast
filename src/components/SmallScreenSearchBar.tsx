import { FaSearchLocation } from "react-icons/fa";
import { useState } from "react";

const SmallScreenSearchBar = ({
  onSearch,
}: {
  onSearch: (city: string) => void;
}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const handleSearch = () => {
    if (searchInput) {
      onSearch(searchInput);
      setIsError(false);
    } else {
      setError("Please enter a city name!");
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      {isError && (
        <div className="absolute top-3 end-3 z-[100] bg-error text-white px-5 py-[9px] rounded text-[15px] animate__animated animate__headShake">
          {error}
        </div>
      )}
      <div className="sm:hidden flex items-center bg-primary px-3 py-2 text-white rounded-md w-full mb-3">
        <input
          type="text"
          className="bg-transparent text-[14px] pe-3 w-full outline-none"
          placeholder="Search city..."
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="text-[20px]" onClick={handleSearch}>
          <FaSearchLocation />
        </button>
      </div>
    </>
  );
};

export default SmallScreenSearchBar;
