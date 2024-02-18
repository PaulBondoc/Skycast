import ReactIcon from "../assets/icons/react.png";
import TailwindIcon from "../assets/icons/tailwind.png";
import Links from "./Links";

type Icons = {
  src: string;
  alt: string;
};

const Footer = () => {
  const icons: Icons[] = [
    {
      src: ReactIcon,
      alt: "React Icon",
    },
    {
      src: TailwindIcon,
      alt: "Tailwind Icon",
    },
  ];
  return (
    <>
      <footer className="text-white bg-primary grid place-items-center gap-y-2 text-[14px] py-10">
        <p className=" tracking-wide">Copyright &copy; 2024 Skycast</p>
        <div className="tracking-wide flex items-center gap-[5px]">
          Created with
          {icons.map((item: Icons, index: number) => (
            <img
              key={index}
              src={item.src}
              alt={item.alt}
              className="w-[27px]"
            />
          ))}
          By Paul Bondoc
        </div>
        <Links />
      </footer>
    </>
  );
};

export default Footer;
