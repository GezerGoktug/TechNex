import ProductCards from "../components/UI/Cards/ProductCards";
import { useSelector } from "react-redux";
import { SMALL_PRODUCT_CARD } from "../constants/types";
import { FaBoxOpen } from "react-icons/fa6";
import Button from "../components/UI/Button";
import { Link } from "react-router-dom";
import { useGetFavouriteProductsQuery } from "../redux/api/favProductApi";


const Favourites = () => {
  const { user } = useSelector((state) => state.authSlice);
  const { isLoading, data: favProducts } = useGetFavouriteProductsQuery(
    user.uid
  );
  return (
    <div className="custom-container  my-36">
      <h4 className="font-bold text-4xl sm:text-5xl mb-12 ">
        My Favourites Products
      </h4>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4   xl:grid-cols-5 gap-2 xs:gap-4">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div
              key={item}
              className="animate-pulse h-40 rounded-xl w-full bg-slate-200"
            />
          ))
        ) : favProducts.length === 0 ? (
          <div className="  my-12  col-span-5 text-center col-center gap-4">
            <FaBoxOpen className="text-8xl" />
            <div className="text-3xl font-semibold">
              You don{"'"}t have any favorite products
            </div>
            <p className="font-medium text-xl">Let{"'"}s add some products</p>
            <Link to="../products">
              <Button className="bg-indigo-600 rounded-lg hover:bg-indigo-700  text-white ">
                Add Favourite products
              </Button>
            </Link>
          </div>
        ) : (
          favProducts.map((product) => (
            <ProductCards
              key={product.id}
              product={product}
              isFavoritePage={1}
              type={SMALL_PRODUCT_CARD}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Favourites;
