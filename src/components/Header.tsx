import SearchBar from "./SearchBar";
import TargetButton from "./TargetButton";
import ThemeToggler from "./ThemeToggler";
import { FaLocationDot } from "react-icons/fa6";
import Profile from "../assets/profile.jpg";

type Props = {
  city?: string;
  country?: string;
  onSearch: (city: string) => void;
};

const Header = (props: Props) => {
  return (
    <>
      <header className="p-3 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-5">
          <TargetButton />
          <div className="flex items-center gap-2 text-secondary">
            <FaLocationDot className="text-[18px] xs:text-[20px]" />
            <span className="font-medium text-[14px] xs:text-[15px]">
              {props.city}
              {props.country ? `, ${props.country}` : ""}
            </span>
          </div>
          <SearchBar onSearch={props.onSearch} />
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggler />
          <div>
            <img
              src={Profile}
              alt="Profile"
              className="w-[40px] xs:w-[45px] rounded-full border-2 border-primary"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
