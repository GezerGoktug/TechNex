import { motion } from "framer-motion";
import useFirebaseImageUrl from "../../../hooks/useFirebaseImageUrl";
import { useRef } from "react";
import { fadeInLeft } from "../../../animations/variants";

const DetailPicture = ({ sources }) => {
  const img = useRef();
  const images = {
    img1: useFirebaseImageUrl(sources.images.img1),
    img2: useFirebaseImageUrl(sources.images.img2),
    img3: useFirebaseImageUrl(sources.images.img3),
  };

  const handleClickİmage = (num) => {
    switch (num) {
      case 1:
        img.current.src = images.img1;
        break;
      case 2:
        img.current.src = images.img2;
        break;
      case 3:
        img.current.src = images.img3;
        break;
      default:
        break;
    }
  };
  return (
    <motion.div
      variants={fadeInLeft}
      animate="open"
      initial="close"
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full sm:w-1/2  "
    >
      <img
        ref={img}
        className="h-[400px] object-contain w-full rounded-2xl p-16 bg-slate-200"
        src={images.img1}
        alt=""
      />
      <div className="flex gap-2 md:gap-4 lg:gap-8   mt-8">
        {Object.keys(images).map((key, index) => (
          <>
            <img
              key={index}
              onClick={() => handleClickİmage(index + 1)}
              className="cursor-pointer h-[70px] lg:h-[90px] w-[70px] lg:w-[90px] object-contain  bg-slate-200 p-4 rounded-lg"
              src={images[key]}
              alt=""
            />
          </>
        ))}
      </div>
    </motion.div>
  );
};

export default DetailPicture;
