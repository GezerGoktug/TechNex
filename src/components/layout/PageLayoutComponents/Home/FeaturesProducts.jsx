import Slider from "react-slick";
import ProductCards from "../../../UI/ProductCards";
import types from "../../../../constants/types";
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { useState } from "react";

const FeaturesProducts = () => {
  const settings = {
    dots: true,
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 930,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const [loading, setLoading] = useState(true)
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    //! Öne çıkan ürün verilerini al
    const collect = collection(db, "products");
    const unSub = onSnapshot(collect, (snapshot) => {
      setFeaturedProducts(
        snapshot.docs
          .filter((doc) => doc.data().isFeaturedProducts)
          .map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setLoading(false)
    });

    return () => unSub();
  }, []);

  return (
    <>
      <h4 className="mt-12 bg-skew before:bg-indigo-600 xs:p-3 p-4 text-white  mx-auto   text-3xl font-playfair font-bold  ">
        Featured Products
      </h4>

      <div className="my-12 slider-container  ">
        <Slider {...settings}>
          {
            loading ? (
              [1,2,3,4].map(item=>(
                <div key={item} className="p-4">
                  <div className="bg-slate-200 h-72 animate-pulse rounded-lg"/>
                </div>
              ))
            ):(
              featuredProducts.map((item, i) => (
                <ProductCards
                  product={item}
                  key={i}
                  type={types.FEATURES_PRODUCT_CARD}
                />
              ))

            )
          }
        </Slider>
      </div>
    </>
  );
};

export default FeaturesProducts;
