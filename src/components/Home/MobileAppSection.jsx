import { BiCommentDetail } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { TbWorldDownload } from "react-icons/tb";
import { motion } from "framer-motion";
import { fadeInUp,fadeInLeft,fadeInRights } from "../../animations/variants";


const MobileAppSection = () => {
  return (
    <>
      <h5 className="text-gradient-b from-violet-300 to-purple-700 px-6 py-6  text-4xl md:text-5xl font-bold text-center   ">
        Experience our mobile app
      </h5>
      <motion.div
        variants={fadeInUp}
        whileInView="open"
        initial="close"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid sm:grid-cols-3  my-4 font-bold "
      >
        <div className="col-center gap-2  py-12 sm:py-6  text-purple-700 text-5xl md:text-7xl ">
          <TbWorldDownload />
          <h6 className=" text-xl md:text-2xl lg:text-3xl text-gradient-b from-violet-300 to-purple-700">
            150K+ Download
          </h6>
        </div>
        <div className="border-y-2  sm:border-y-0 sm:border-x-2 border-violet-500 border-dashed col-center gap-2  py-12 sm:py-6  text-yellow-500 text-5xl md:text-7xl ">
          <FaStar />
          <h6 className=" text-xl md:text-2xl lg:text-3xl text-gradient-b from-yellow-300 to-yellow-700">
            4.5 Rating
          </h6>
        </div>
        <div className="col-center gap-2  py-12 sm:py-6  text-slate-700 text-5xl md:text-7xl ">
          <BiCommentDetail />
          <h6 className=" text-xl md:text-2xl lg:text-3xl text-gradient-b from-slate-300 to-zinc-700">
            10K+ Comments
          </h6>
        </div>
      </motion.div>
      <div className="col-center gap-y-4 sm:flex-row mt-6">
        <motion.div
          variants={fadeInLeft}
          whileInView="open"
          initial="close"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center text-indigo-700 text-4xl lg:text-5xl gap-2 md:gap-4 sm:w-[42%] xl:w-1/3 sm:border-e-2 border-indigo-400"
        >
          <h6 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl text-gradient-r from-indigo-400 to-indigo-800  font-bold">
            Download Now
          </h6>
          <IoMdDownload />
        </motion.div>
        <motion.div
          variants={fadeInRights}
          whileInView="open"
          initial="close"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="sm:w-[58%] xl:w-2/3 flex-around flex-wrap sm:flex-nowrap  gap-1 md:gap-2 xl:gap-4 "
        >
          <a href="#">
            <img
              className="object-cover sm:object-contain h-24 xl:h-36"
              src="/img/sections/googleplay.png"
              alt="googleplay"
            />
          </a>
          <a href="#">
            <img
              className="object-cover sm:object-contain h-16 xl:h-24"
              src="/img/sections/appstore.png"
              alt="appstore"
            />
          </a>
        </motion.div>
      </div>
    </>
  );
};

export default MobileAppSection;
