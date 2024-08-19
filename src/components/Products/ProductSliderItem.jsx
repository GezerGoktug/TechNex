import { motion } from "framer-motion";
import { fadeInUp } from "../../animations/variants";
import Button from "../UI/Button";

const ProductSliderItem = ({ content }) => {
  return (
    <div>
      <div className="col-center sm:flex-row gap-12 sm:gap-0  py-12 sm:py-24 ">
        <motion.div
          variants={fadeInUp}
          animate="open"
          initial="close"
          transition={{ duration: 0.5, delay: 1.5 }}
          className="sm:w-1/2 ms-6 sm:ms-12"
        >
          <h3 className="font-playfair font-extralight text-4xl lg:text-6xl">
            {content.title}
          </h3>
          <p className="my-4 sm:my-8 lg:text-lg">{content.description}</p>
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg  text-white">
            Discover
          </Button>
        </motion.div>
        <motion.img
          variants={fadeInUp}
          animate="open"
          initial="close"
          transition={{ duration: 0.5, delay: 1.5 }}
          className="sm:w-1/2  h-[250px] lg:h-[350px] object-contain"
          src={content.src}
          alt={content.title}
        />
      </div>
    </div>
  );
};

export default ProductSliderItem;
