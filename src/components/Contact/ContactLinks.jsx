import { Card } from "flowbite-react";
import { motion } from "framer-motion";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { fadeInRights } from "../../animations/variants";

const ContactLinks = () => {
  return (
    <motion.div
      variants={fadeInRights}
      whileInView="open"
      initial="close"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="sm:w-1/2  text-white "
    >
      <Card className="!bg-blue-500 border-0 h-[400px]  ">
        <h4 className=" font-medium text-3xl ">Contact Links</h4>
        <div className="flex items-center gap-2  hover:gap-5 cursor-pointer transition-all">
          <span className="text-2xl md:text-3xl">
            <MdOutlineAlternateEmail className="bg-blue-600/70  box-content p-3 md:p-4  rounded-full" />
          </span>
          <span className="text-xl">example@gmail.com</span>
        </div>
        <div className="flex items-center gap-2  hover:gap-5 cursor-pointer transition-all">
          <span className="text-2xl md:text-3xl">
            <BsFillTelephoneFill className="bg-blue-600/70  box-content p-3 md:p-4  rounded-full" />
          </span>
          <span className="text-xl">+90 123 456 78 90 </span>
        </div>
        <div className="flex items-center mb-auto gap-2 hover:gap-5 cursor-pointer transition-all ">
          <span className="text-2xl md:text-3xl">
            <FaLocationDot className="bg-blue-600/70    box-content p-3 md:p-4   rounded-full    " />
          </span>
          <address className="text-lg md:text-xl">
            123 Istiklal Avenue Beyoğlu, Istanbul 34430, Turkey
          </address>
        </div>
      </Card>
    </motion.div>
  );
};

export default ContactLinks;
