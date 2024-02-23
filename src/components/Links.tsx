import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

type Links = {
  Icon: React.ElementType;
  link: string;
};

const Links = () => {
  const links: Links[] = [
    { Icon: FaGithub, link: "https://github.com/PaulBondoc" },
    {
      Icon: FaLinkedin,
      link: "www.linkedin.com/in/paul-jhon-bondoc-8912992b4",
    },
    { Icon: FaFacebook, link: "https://www.facebook.com/Pjbndc.01" },
  ];
  return (
    <>
      <div className="flex gap-5 mt-3">
        {links.map((item: Links, index: number) => (
          <a key={index} href={item.link} target="_blank">
            <item.Icon className="text-[30px]" />
          </a>
        ))}
      </div>
    </>
  );
};

export default Links;
