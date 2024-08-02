import { motion } from "framer-motion";
import Button from "../../UI/Button";
import { RiText } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import Input from "../../UI/Input";
import { fadeInUp } from "../../../animations/variants";

const Newsletter = () => {
  return (
    <section
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(0,0,0,0.7344187675070029) 0%, rgba(0,0,0,0.15458683473389356) 100%),url(/img/sections/section.jpg)",
      }}
      className=" bg-center bg-cover bg-no-repeat   py-24  "
    >
      <motion.div
        variants={fadeInUp}
        whileInView="open"
        initial="close"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col-reverse sm:flex-row custom-container text-white "
      >
        <div className="sm:w-1/2  backdrop-blur-sm flex flex-col p-6 sm:p-4 lg:p-8 border border-zinc-500   gap-3">
          <h4 className="text-2xl lg:text-4xl font-bold">
            Subscribe to our newsletter
          </h4>
          <p className="font-medium lg:text-lg">
            You can subscribe to our newsletter to be instantly informed about
            the latest discounts.
          </p>
          <form className="flex flex-col gap-3 text-black">
            <Input
              placeholder="Your name"
              className=" lg:w-3/4"
              leftIcon={<RiText />}
            />
            <Input
              placeholder="Your email"
              type="email"
              className=" lg:w-3/4"
              leftIcon={<MdOutlineAlternateEmail />}
            />
            <Button
              type="submit"
              className="border-slate-200 border text-slate-200 hover:text-black rounded hover:bg-slate-200 w-max "
            >
              Subscribe
            </Button>
          </form>
        </div>
        <div className=" bg-sky-300 bg-[url('../public/img/sections/newsletter.png')] bg-center bg-contain   bg-no-repeat sm:w-1/2   min-h-[400px]" />
      </motion.div>
    </section>
  );
};

export default Newsletter;
