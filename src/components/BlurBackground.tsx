const BlurBackground = () => {
  const circleStyle: string[] = [
    "-top-20 left-56 w-96 h-96 bg-orange-300",
    "-bottom-20 right-60 w-80 h-80 bg-cyan-400",
    "-left-20 -bottom-20 w-72 h-72 bg-yellow-300",
    "-top-10 left-10 w-52 h-52 bg-cyan-400",
    "-top-20 right-0 w-72 h-72 bg-yellow-300",
    "-bottom-10 right-10 w-80 h-40 bg-orange-300",
  ];

  return (
    <>
      {circleStyle.map((style: string, index: number) => (
        <div
          key={index}
          className={`absolute opacity-80 -z-[1] blur-3xl rounded-full ${style}`}
        ></div>
      ))}
    </>
  );
};

export default BlurBackground;
