import Slider from "react-slick";
import useFeaturedProducts from "../../hooks/useFeaturedProducts";
import { FEATURES_PRODUCT_CARD } from "../../constants/types";
import ProductCards from "../UI/Cards/ProductCards";

const FeaturedProducts = () => {
  const settings = {
    dots: true,
    infinite: true,
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
  const { loading, featuredProducts } = useFeaturedProducts();

  return (
    <>
      <h4 className="mt-12 bg-skew before:bg-indigo-600 xs:p-3 p-4 text-white  mx-auto   text-3xl font-playfair font-bold  ">
        Featured Products
      </h4>

      <div className="my-12 slider-container  ">
        <Slider {...settings}>
          {loading
            ? [1, 2, 3, 4].map((item) => (
                <div key={item} className="p-4">
                  <div className="bg-slate-200 h-72 animate-pulse rounded-lg" />
                </div>
              ))
            : featuredProducts.map((item, i) => (
                <ProductCards
                  product={item}
                  key={i}
                  type={FEATURES_PRODUCT_CARD}
                />
              ))}
        </Slider>
      </div>
    </>
  );
};

export default FeaturedProducts;
