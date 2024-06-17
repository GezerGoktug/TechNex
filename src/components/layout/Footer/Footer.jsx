import FooterBottom from "./FooterBottom";
import FooterTop from "./FooterTop";

const Footer = () => {
  return (
    <footer className="bg-slate-200 py-12">
      <div className="custom-container ">
        <FooterTop />
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
