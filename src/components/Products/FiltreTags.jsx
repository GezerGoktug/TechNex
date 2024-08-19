import { useSelector } from "react-redux";
import FiltreTag from "./FiltreTag";
import { motion } from "framer-motion";

const FiltreTags = () => {
  const { filtreTags } = useSelector((state) => state.filtreSlice);
  const {
    searchTerm,
    minPrice,
    filteredBrands,
    filteredCategories,
    filteredYears,
  } = filtreTags;
  return (
    <motion.div
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      initial={{ x: 260, opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      id="filtre-tags"
      className="flex overflow-x-auto gap-3 pb-4 mb-8"
    >
      {[
        `Search:${searchTerm}`,
        `${minPrice}$`,
        ...filteredBrands,
        ...filteredCategories,
        ...filteredYears,
      ].map((item, i) => (
        <FiltreTag key={i} tagContent={item} />
      ))}
    </motion.div>
  );
};

export default FiltreTags;
