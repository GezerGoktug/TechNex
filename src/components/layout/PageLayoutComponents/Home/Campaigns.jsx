import { fadeInLeft, fadeInRights } from "../../../../animations/variants";
import Button from "../../../UI/Button";
import { motion } from "framer-motion";

const Campaigns = () => {
  return (
    <section className="grid  sm:grid-cols-2 lg:grid-cols-3 gap-3 my-12 text-white">
      <motion.div
        variants={fadeInLeft}
        whileInView="open"
        initial="close"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="campaign c-p-1 h-96 lg:h-72 px-6 pt-12 "
      >
        <h3 className="font-semibold text-2xl   ">
          Light and powerful laptops
        </h3>
        <p className="my-4 ">
          Take power everywhere with its lightweight design
        </p>
        <Button className="bg-transparent rounded  hover:bg-white hover:text-black outline outline-slate-100 ">
          View
        </Button>
      </motion.div>
      <motion.div
        variants={fadeInRights}
        whileInView="open"
        initial="close"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="campaign c-p-2 h-96 lg:h-72 lg:col-span-2  px-6 pt-12"
      >
        <h3 className="font-semibold text-2xl   ">Multidirectional!</h3>
        <p className="my-4 ">
          New tablets are versatile, discover the power of different uses
        </p>
        <Button className="bg-transparent rounded  hover:bg-white hover:text-black outline outline-slate-100 ">
          View
        </Button>
      </motion.div>
      <motion.div
        variants={fadeInLeft}
        whileInView="open"
        initial="close"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="campaign c-p-3 h-96 lg:h-72 lg:col-span-2  px-6 pt-12"
      >
        <h3 className="font-semibold text-2xl   ">
          A Brand New World at Your Fingertips
        </h3>
        <p className="my-4 ">
          Step into perfection. Break the boundaries of boundary-pushing phones
          and technology
        </p>
        <Button className="bg-transparent rounded  hover:bg-white hover:text-black outline outline-slate-100 ">
          View
        </Button>
      </motion.div>
      <motion.div
        variants={fadeInRights}
        whileInView="open"
        initial="close"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="campaign c-p-4 h-96 lg:h-72  px-6 pt-12"
      >
        <h3 className="font-semibold text-2xl   ">
          Make Your Life Easier with a Smart Watch!
        </h3>
        <p className="my-4 ">
          Make your life more organized, more efficient and more fun with a
          smart watch
        </p>
        <Button className="bg-transparent rounded  hover:bg-white hover:text-black outline outline-slate-100 ">
          View
        </Button>
      </motion.div>
    </section>
  );
};

export default Campaigns;
