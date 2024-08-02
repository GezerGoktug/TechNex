import { fadeInUp } from "../../animations/variants";
import Button from "./Button";
import { motion } from "framer-motion";

const HeroSliderItem = ({ item, i }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.7344187675070029) 0%, rgba(0,0,0,0.15458683473389356) 100%),url(/img/hero/hero_${
          i + 1
        }-min.jpg)`,
      }}
      className="flex items-center carousel-item  h-full  "
    >
      <motion.div
        variants={fadeInUp}
        animate="open"
        initial="close"
        transition={{ duration: 0.5, delay: 0.5 }}
        className="custom-container "
      >
        <h2 className="font-playfair  text-4xl  sm:text-5xl xl:text-7xl font-extrabold">
          {item.header}
        </h2>
        <p className="font-medium text-base sm:text-lg xl:text-xl my-4">
          {item.desc}
        </p>
        <div className="flex gap-4  mb-16 ">
          <Button className="btn-gradient">Discover</Button>
          <Button className="btn-gradient">Catch</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSliderItem;
