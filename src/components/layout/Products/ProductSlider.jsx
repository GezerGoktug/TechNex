import Slider from "react-slick";
import { motion } from "framer-motion";
import ProductSliderItem from "../../UI/ProductSliderItem";
import { productsPageSliderContent } from "../../../constants/content";

const ProductSlider = () => {
  const settings = {
    dots: true,
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    swipeToSlide: true,
  };

  return (
    <motion.div
      animate={{ opacity: 1, scaleX: 1 }}
      initial={{ opacity: 0, scaleX: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="slider-container  bg-gradient-to-tl from-slate-200 to-zinc-300  rounded-xl"
    >
      <Slider {...settings}>
        {productsPageSliderContent.map((item, i) => (
          <ProductSliderItem key={i} content={item} />
        ))}
      </Slider>
    </motion.div>
  );
};

export default ProductSlider;
