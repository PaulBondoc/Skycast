import { useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import "animate.css";

const SearchBar = ({ onSearch }: { onSearch: (city: string) => void }) => {
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
        <div className="absolute top-5 end-5 z-[100] bg-error text-white px-5 py-3 rounded text-[15px] animate__animated animate__headShake">
          {error}
        </div>
      )}
      <div className="hidden sm:flex items-center bg-primary px-3 py-2 text-white rounded-md w-[270px]">
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

export default SearchBar;
