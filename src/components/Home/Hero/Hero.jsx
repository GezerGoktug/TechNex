import { Carousel } from "flowbite-react";
import HeroSliderItem from "./HeroSliderItem";
import { useLocation } from "react-router-dom";
import { sliderData } from "../../../constants/content";

const Hero = () => {
  const { pathname } = useLocation();

  if (pathname !== "/") return;

  return (
    <section>
      <Carousel
        draggable={false}
        slideInterval={7000}
        className="[&_div]:rounded-none h-screen  "
      >
        {sliderData.map((item, i) => (
          <HeroSliderItem key={i} i={i} item={item} />
        ))}
      </Carousel>
    </section>
  );
};

export default Hero;
