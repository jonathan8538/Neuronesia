import logo from "../assets/logo/Logo-Aivise-White.png";
import logofooter from "../assets/logo/favicon-1.png";

const Footer = () => {
  return (
    <footer className="pt-5 h-32 bg-black text-white py-5 px-15 flex justify-between items-center max-sm:flex-col max-sm:justify-center max-sm:gap-4 max-sm:h-35">
      <div className="flex gap-3 justify-center items-center">
        <img src={logofooter} alt="" className="w-10" />
        <p className="font-bold text-2xl">Aivise</p>
      </div>
      <p className="">@Made by Neuronesia</p>
    </footer>
  );
};

export default Footer;
