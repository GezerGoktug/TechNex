import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFavouriteProducts = (uid) => {
  const [favProducts, setFavProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //! Favori ürünleri al
    const docRef = doc(db, "users", uid);
    const unSub = onSnapshot(docRef, (snapshot) => {
      const arr = snapshot.data().favouritesProducts;
      setFavProducts(Object.keys(arr).map((product) => arr[product]));
      setLoading(false);
    });

    return () => unSub();
  }, []);
  return { favProducts, loading };
};

export default useFavouriteProducts;
