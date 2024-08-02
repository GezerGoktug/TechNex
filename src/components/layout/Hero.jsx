import {  Carousel } from "flowbite-react";
import { sliderData } from "../../constants/content";
import HeroSliderItem from "../UI/HeroSliderItem";

const Hero = () => {
  return (
    <section>
      <Carousel
        draggable={false}
        slideInterval={7000}
        className="[&_div]:rounded-none absolute top-0  h-full  left-0 "
      >
        {sliderData.map((item, i) => (
          <HeroSliderItem key={i} i={i} item={item} />
        ))}
      </Carousel>
    </section>
  );
};

export default Hero;
