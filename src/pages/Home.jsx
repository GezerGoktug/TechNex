import Section1 from "../components/Home/Section1";
import FeaturesProducts from "../components/Home/FeaturesProducts";
import Brands from "../components/Home/Brands";
import MobileAppSection from "../components/Home/MobileAppSection";
import Campaigns from "../components/Home/Campaigns/Campaigns";
import Newsletter from "../components/Home/Newsletter";
import { auth } from "../firebase/config";
import { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    if(auth.currentUser){
      console.log(auth?.currentUser.uid);
      console.log(auth?.currentUser);
    }
   
  

  }, [])

  
  
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
