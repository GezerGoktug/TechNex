import Section1 from "../components/layout/PageLayoutComponents/Home/Section1";
import FeaturesProducts from "../components/layout/PageLayoutComponents/Home/FeaturesProducts";
import Brands from "../components/layout/PageLayoutComponents/Home/Brands";
import MobileAppSection from "../components/layout/PageLayoutComponents/Home/MobileAppSection";
import Campaigns from "../components/layout/PageLayoutComponents/Home/Campaigns";
import Newsletter from "../components/layout/PageLayoutComponents/Home/Newsletter";

const Home = () => {
  return (
    <>
      <Section1 />
      <div className="custom-container flex flex-col">
        <FeaturesProducts />
        <Brands />
        <MobileAppSection />
        <Campaigns />
      </div>
      <Newsletter />
    </>
  );
};

export default Home;
