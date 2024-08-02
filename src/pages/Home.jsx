import Section1 from "../components/layout/Home/Section1";
import FeaturesProducts from "../components/layout/Home/FeaturesProducts";
import Brands from "../components/layout/Home/Brands";
import MobileAppSection from "../components/layout/Home/MobileAppSection";
import Campaigns from "../components/layout/Home/Campaigns";
import Newsletter from "../components/layout/Home/Newsletter";

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
