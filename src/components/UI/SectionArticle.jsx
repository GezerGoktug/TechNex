import { MdSend } from "react-icons/md";
import Button from "./Button";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRights } from "../../animations/variants";

const SectionArticle = ({ article }) => {
  return (
    <section
      className={`col-center sm:flex-row ${
        article.isReverse && "sm:flex-row-reverse"
      } my-12 gap-12`}
    >
      <motion.div
        variants={article.isReverse ? fadeInRights : fadeInLeft}
        whileInView="open"
        initial="close"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className=" w-full sm:w-1/2  "
      >
        <img
          className=" h-[300px] lg:h-[400px] xl:h-[500px] bg-slate-200 rounded-[70px] object-contain w-full"
          src={article.src}
          alt={article.header}
        />
      </motion.div>
      <motion.div
        variants={!article.isReverse ? fadeInRights : fadeInLeft}
        whileInView="open"
        initial="close"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="sm:w-1/2"
      >
        <h6 className="font-playfair text-4xl lg:text-5xl xl:text-6xl text-gradient-b from-slate-300 to-zinc-700 font-bold mb-4 ">
          {article.header}
        </h6>
        <p className="font-medium text-sm lg:text-base xl:text-lg">
          {article.desc}
        </p>
        {article.button && (
          <Button className="border-2 border-orange-700 hover:bg-orange-700 hover:text-white  mt-2 rounded-full text-orange-700">
            <MdSend />
            {article.button}
          </Button>
        )}
      </motion.div>
    </section>
  );
};

export default SectionArticle;
