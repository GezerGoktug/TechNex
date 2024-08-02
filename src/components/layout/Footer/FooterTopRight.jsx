import { useSelector } from "react-redux";
import { footerLinks } from "../../../constants/content";
import { Link } from "react-router-dom";

const FooterTopRight = () => {
  const { isLoggedIn } = useSelector((state) => state.authSlice);
  return (
    <div className="sm:w-2/3 grid grid-cols-2 gap-y-4 min-[430px]:grid-cols-3  ">
      <div className="sm:mx-auto">
        <h6 className="font-bold text-lg mb-1">Pages</h6>
        <ul className="inline-grid  lg:grid-cols-2 font-medium text-zinc-600 gap-x-6 gap-y-2  text-left">
          {footerLinks.page.map((text, i) => (
            <li key={i}>
              <Link
                to={
                  text.conditionalPath
                    ? isLoggedIn
                      ? text.conditionalPath
                      : "auth"
                    : text.path
                }
              >
                {text.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sm:mx-auto">
        <h6 className="font-bold text-lg mb-1   ">Conditions</h6>
        <ul className="inline-grid font-medium  gap-y-2 text-zinc-600  text-left">
          {footerLinks.privacy.map((text, i) => (
            <li key={i}>
              <Link>{text}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sm:mx-auto">
        <h6 className="font-bold text-lg mb-1 ">Categories</h6>
        <ul className="inline-grid lg:grid-cols-2 font-medium text-zinc-600 gap-x-6 gap-y-2  text-left">
          {footerLinks.categories.map((text, i) => (
            <li key={i}>
              <Link>{text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterTopRight;
