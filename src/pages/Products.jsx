import Button from "../components/UI/Button";
import { useEffect } from "react";
import { MdFilterList } from "react-icons/md";
import ProductSlider from "../components/Products/ProductSlider";
import Filter from "../components/Products/Filter";
import FiltreTags from "../components/Products/FiltreTags";
import ProductsSection from "../components/Products/ProductsSection";
import Categories from "../components/Products/Categories";
import { motion } from "framer-motion";
import { fadeInLeft } from "../animations/variants";
import { filtreActions } from "../redux/slices/filtreSlice";
import { useDispatch } from "react-redux";
import { modalActions } from "../redux/slices/modalSlice";
import Modal from "../components/UI/Modal";
import Pagination from "../components/Products/Pagination";

const Products = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //! Sayfaya ilk girildiğinde filtre koşullarını sıfırla
    dispatch(filtreActions.resetFiltreTags());
  }, []);
  return (
    <>
      {/* FILTER MODAL (For mobile) START  */}
      <Modal>
        <Filter />
      </Modal>
      {/* FILTER MODAL  STOP */}
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
            <Filter />
          </motion.div>
          <Button
            onClick={() => dispatch(modalActions.openModal())}
            className="md:hidden col-span-12 bg-indigo-600 text-white rounded-lg w-max ms-auto"
          >
            Filters
            <MdFilterList />
          </Button>
          <div className=" col-span-12 md:col-span-7 lg:col-span-2">
            <FiltreTags />
            <ProductsSection />
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
