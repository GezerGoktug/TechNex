import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFeaturedProducts = () => {
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    //! Öne çıkan ürün verilerini al
    const collect = collection(db, "products");
    const q = query(collect, where("isFeaturedProducts", "==", true));
    const unSub = onSnapshot(q, (snapshot) => {
      setFeaturedProducts(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setLoading(false);
    });

    return () => unSub();
  }, []);
  return { loading, featuredProducts };
};

export default useFeaturedProducts;
