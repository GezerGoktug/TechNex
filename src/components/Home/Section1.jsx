import { fadeInUp } from "../../animations/variants";
import Button from "../UI/Button";
import { motion } from "framer-motion";

const Section1 = () => {
  return (
    <section
      id="home-section-1"
      className=" h-[600px] border-y-2 border-slate-400 text-white "
    >
      <motion.div
        variants={fadeInUp}
        whileInView="open"
        initial="close"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="custom-container text-center flex-center  flex-col gap-4 h-full "
      >
        <h3 className="text-3xl sm:text-6xl font-bold">
          Discover the latest products now
        </h3>
        <p className="sm:text-xl font-semibold">
          Technology products in all categories are here. Start exploring now
        </p>
        <Button className="bg-transparent rounded  hover:bg-white hover:text-black outline outline-slate-100 ">
          View products
        </Button>
      </motion.div>
    </section>
  );
};

export default Section1;
