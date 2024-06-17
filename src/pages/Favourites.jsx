import ProductCards from "../components/UI/ProductCards";
import types from "../constants/types";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";

const Favourites = () => {
  const { user } = useSelector((state) => state.authSlice);
  const [favProducts, setFavProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //! Favori ürünleri al
    const docRef = doc(db, "users", user.uid);
    const unSub = onSnapshot(docRef, (snapshot) => {
      const arr = snapshot.data().favouritesProducts;
      setFavProducts(Object.keys(arr).map((product) => arr[product]));
      setLoading(false);
    });

    return () => unSub();
  }, []);

  return (
    <div className="custom-container  my-32">
      <h4 className="font-bold text-4xl sm:text-5xl mb-12 ">
        My Favourites Products
      </h4>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4   xl:grid-cols-5 gap-2 xs:gap-4">
        {loading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div
                key={item}
                className="animate-pulse h-40 rounded-xl w-full bg-slate-200"
              />
            ))
          : favProducts.map((product) => (
              <ProductCards
                key={product.id}
                product={product}
                isFavoritePage={1}
                type={types.SMALL_PRODUCT_CARD}
              />
            ))}
      </div>
    </div>
  );
};

export default Favourites;
