import { useSelector } from "react-redux";
import { SMALL_PRODUCT_CARD } from "../../../constants/types"; 
import ProductCards from "../../UI/Cards/ProductCards";

const ProductsSection = () => {
  const { products, loading } = useSelector((state) => state.productsSlice);
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
                type={SMALL_PRODUCT_CARD}
              />
            ))}
      </div>
    </div>
  );
};

export default ProductsSection;
