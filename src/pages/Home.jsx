import Section1 from "../components/Home/Section1";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import Brands from "../components/Home/Brands";
import MobileAppSection from "../components/Home/MobileAppSection";
import Campaigns from "../components/Home/Campaigns/Campaigns";
import Newsletter from "../components/Home/Newsletter";

const Home = () => {
  return (
    <>
      <Section1 />
      <div className="custom-container flex flex-col">
        <FeaturedProducts />
        <Brands />
        <MobileAppSection />
        <Campaigns />
      </div>
      <Newsletter />
    </>
  );
};

export default Home;
