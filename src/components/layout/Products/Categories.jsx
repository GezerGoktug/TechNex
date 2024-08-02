import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { filtreActions } from "../../../redux/slices/filtreSlice";
import { fadeInUp } from "../../../animations/variants";
import CategoryCard from "../../UI/Cards/CategoryCard";
import { categories } from "../../../constants/content";

const Categories = () => {
  const dispatch = useDispatch();
  const categoryHandle = (category) =>
    dispatch(filtreActions.updateCategory([category]));

  return (
    <motion.div
      variants={fadeInUp}
      whileInView="open"
      initial="close"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className=" grid  grid-cols-2 min-[570px]:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6  pb-8 gap-y-6 gap-x-3 xs:gap-x-6  sm:gap-x-8 md:gap-x-16 xl:gap-x-12 mt-12 "
    >
      {categories.map((item, i) => (
        <CategoryCard
          onClick={() => categoryHandle(item.title)}
          key={i}
          item={item}
        />
      ))}
    </motion.div>
  );
};

export default Categories;
