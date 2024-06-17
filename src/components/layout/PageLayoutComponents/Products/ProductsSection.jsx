import { useEffect } from "react";
import types from "../../../../constants/types";
import ProductCards from "../../../UI/ProductCards";
import { useDispatch } from "react-redux";
import { filtreActions } from "../../../../redux/slices/productsSlice";

const ProductsSection = ({ products, loading }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    //! Sayfaya ilk girildiğinde filtre koşullarını sıfırla
    dispatch(
      filtreActions.updateFiltreTags({
        searchTerm: "",
        minPrice: 0,
        filteredBrands: [],
        filteredCategories: [],
        filteredYears: [],
      })
    );
  }, []);

  return (
    <div className="min-h-[1150px]">
      <div className=" grid   grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
        {loading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
              (item) => (
                <div
                  key={item}
                  className="animate-pulse h-60 rounded-xl w-full bg-slate-200"
                />
              )
            )
          : products.map((item) => (
              <ProductCards
                key={item.id}
                product={item}
                type={types.SMALL_PRODUCT_CARD}
              />
            ))}
      </div>
    </div>
  );
};

export default ProductsSection;
