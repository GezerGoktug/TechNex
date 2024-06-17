import Button from "../components/UI/Button";
import { useState } from "react";
import { MdFilterList } from "react-icons/md";
import ProductSlider from "../components/layout/PageLayoutComponents/Products/ProductSlider";
import Filter from "../components/layout/PageLayoutComponents/Products/Filter";
import FiltreTags from "../components/layout/PageLayoutComponents/Products/FiltreTags";
import ProductsSection from "../components/layout/PageLayoutComponents/Products/ProductsSection";
import Categories from "../components/layout/PageLayoutComponents/Products/Categories";
import { useOutletContext } from "react-router-dom";
import Pagination from "../components/UI/Pagination";
import { motion } from "framer-motion";
import { fadeInLeft } from "../animations/variants";

const Products = () => {
  const { setModal } = useOutletContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="my-36 custom-container">
      <ProductSlider />
      <h4 className="text-center text-4xl bg-gradient-to-tl from-slate-300 to-zinc-300 font-extralight mt-16 font-playfair rounded-ss-3xl rounded-ee-3xl  w-3/4 min-[450px]:w-1/2 md:w-1/3 lg:w-1/4 mx-auto py-6">
        Categories
      </h4>
      <Categories />
      <div className="grid grid-cols-12 lg:grid-cols-3 gap-4 mt-12">
        <motion.div
          variants={fadeInLeft}
          whileInView="open"
          initial="close"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block col-span-5 lg:col-span-1 h-max bg-slate-200 shadow-lg rounded-ss-3xl rounded-ee-3xl p-4 "
        >
          <Filter
            setLoading={setLoading}
            currentPage={currentPage}
            setProducts={setProducts}
          />
        </motion.div>
        <Button
          onClick={() =>
            setModal({
              isOpen: true,
              content: (
                <Filter
                  setLoading={setLoading}
                  setModal={setModal}
                  currentPage={currentPage}
                  setProducts={setProducts}
                />
              ),
            })
          }
          className="md:hidden col-span-12 bg-indigo-600 text-white rounded-lg w-max ms-auto"
        >
          Filters
          <MdFilterList />
        </Button>
        <div className=" col-span-12 md:col-span-7 lg:col-span-2">
          <FiltreTags />
          <ProductsSection loading={loading} products={products} />
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
