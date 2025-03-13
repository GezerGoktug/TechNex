import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFeaturedProducts = () => {
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      //! Öne çıkan ürün verilerini al
      const collect = collection(db, "products");
      const q = query(collect, where("isFeaturedProducts", "==", true));
      const productsDocs = await getDocs(q);
      setFeaturedProducts(
        productsDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setLoading(false);
    };
    fetchFeaturedProducts();
  }, []);
  return { loading, featuredProducts };
};

export default useFeaturedProducts;
