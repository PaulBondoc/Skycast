import { GiDiceTarget } from "react-icons/gi";

const TargetButton = () => {
  return (
    <>
      <button className="w-[40px] h-[40px] xs:w-[45px] xs:h-[45px] bg-primary rounded-full grid place-items-center">
        <GiDiceTarget className="text-white text-[23px] xs:text-[25px]" />
      </button>
    </>
  );
};

export default TargetButton;
