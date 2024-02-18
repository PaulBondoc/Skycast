import NotFoundImage from "../assets/404.png";

const NotFound = () => {
  return (
    <>
      <div className="grid place-items-center select-none relative">
        <h1 className=" text-[20rem] font-semibold text-notfound">ERROR</h1>
        <div className="absolute top-[1.5rem]">
          <p className="text-center text-[2rem] font-extrabold tracking-wider text-secondary">
            CITY NOT FOUND!
          </p>
          <img
            src={NotFoundImage}
            alt=""
            className="w-[400px] mx-auto pointer-events-none"
          />
          <p className="text-[15px]">
            If the city you're looking for is not available, please try another
            city or check the spelling.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
