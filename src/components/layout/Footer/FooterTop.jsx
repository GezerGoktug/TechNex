import FooterTopLeft from "./FooterTopLeft";
import FooterTopRight from "./FooterTopRight";

const FooterTop = () => {
  return (
    <div className="flex flex-col gap-y-6 sm:flex-row">
      <FooterTopLeft />
      <FooterTopRight />
    </div>
  );
};

export default FooterTop;
