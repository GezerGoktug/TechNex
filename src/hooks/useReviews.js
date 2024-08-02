import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";


const useReviews = (productID) => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        //! Ürün detay verilerini al
        const unsubscribe = onSnapshot(
          doc(db, "products", productID),
          (productSnap) => {
            if (productSnap.exists()) {
              const productData = productSnap.data();
              setProduct({ ...productData, id: productID });
              setLoading(false);
            } else {
              console.log("No such document!");
              setProduct(null);
              setLoading(false);
            }
          }
        );
    
        return () => unsubscribe();
      }, [productID]);
     return {product,loading} 
}

export default useReviews