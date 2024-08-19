import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Features = ({ features }) => {
  const [featuresArray, setFeaturesArray] = useState([]);
  useEffect(() => {
    //! Ürün Özelliklerini al ve bunu uygun bir dizi formatına çevir
    const newFeaturesArr = Object.entries(features);
    const formattedArr = Array.from({ length: 3 }, () => []);
    newFeaturesArr.forEach((item, i) => {
      const colIndex = i % 3;
      formattedArr[colIndex].push(item);
    });
    setFeaturesArray(formattedArr);
  }, [features]);

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      initial={{ y: 60, opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 text-xs md:grid-cols-3 gap-4"
    >
      {featuresArray.map((item, i) => (
        <ul key={i} className="flex flex-col gap-1">
          {item.map((key, i) => (
            <li key={i} className="flex items-center  text-center ">
              <div className=" h-16 lg:h-14 xl:h-12 flex-center w-1/2 font-bold   bg-slate-300">
                {key[0]}
              </div>
              <div className=" h-16 lg:h-14 xl:h-12 flex-center  w-1/2 bg-slate-200">
                {key[1]}
              </div>
            </li>
          ))}
        </ul>
      ))}
    </motion.div>
  );
};

export default Features;
