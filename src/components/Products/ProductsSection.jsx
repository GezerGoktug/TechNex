import { useDispatch, useSelector } from "react-redux";
import ProductCards from "../UI/Cards/ProductCards";
import { SMALL_PRODUCT_CARD } from "../../constants/types";
import { useEffect } from "react";
import { useState } from "react";
import { handleFiltre } from "../../database/firestoreFunc";
import { filtreActions } from "../../redux/slices/filtreSlice";

const ProductsSection = () => {
  const { filtreTags, currentPage, direction } = useSelector(
    (state) => state.filtreSlice
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [lastProductId, setLastProductId] = useState(null);
  const [firstProductId, setFirstProductId] = useState(null);
  const [pageSize, setPageSize] = useState(16);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) setPageSize(16);
      else if (width >= 930) setPageSize(12);
      else if (width >= 768) setPageSize(8);
      else if (width >= 640) setPageSize(15);
      else setPageSize(16);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await handleFiltre(
        filtreTags,
        currentPage,
        direction === "next" ? lastProductId : firstProductId,
        direction,
        pageSize
      );
      setLastProductId(res.lastProductId);
      setFirstProductId(res.firstProductId);
      setProducts(res.products);
      dispatch(filtreActions.setPageCount(res.totalPage));
      setLoading(false);
    };
    fetchProducts();
  }, [filtreTags, currentPage, pageSize]);

  return (
    <div className="min-h-[1150px]">
      <div className=" grid   grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
        {loading
          ? Array.from({ length: pageSize }, (_, i) => i + 1).map((item) => (
              <div
                key={item}
                className="animate-pulse h-60 rounded-xl w-full bg-slate-200"
              />
            ))
          : products.map((item) => (
              <ProductCards
                key={item.id}
                product={item}
                type={SMALL_PRODUCT_CARD}
              />
            ))}
      </div>
    </div>
  );
};

export default ProductsSection;
