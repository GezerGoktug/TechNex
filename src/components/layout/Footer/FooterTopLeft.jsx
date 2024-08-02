import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import Logo from "../../UI/Logo";

const FooterTopLeft = () => {
  return (
    <div className="sm:w-1/3 pe-4">
      <Logo />
      <p className="font-semibold my-3 text-base ">
        From phones to TVs,smartwatches,and beyond,we{`'`}ve got you
        covered.With customer satisfaction at the heart of our service,we look
        forward to serving you!
      </p>
      <div className="flex flex-wrap gap-3 md:gap-6 text-4xl mt-4">
        <FaInstagram className="social-media-links" />
        <FaFacebook className="social-media-links" />
        <FaLinkedinIn className="social-media-links" />
        <FaYoutube className="social-media-links" />
      </div>
    </div>
  );
};

export default FooterTopLeft;
