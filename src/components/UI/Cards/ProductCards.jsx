import { Badge, Card, Rating } from "flowbite-react";
import { ERROR, FEATURES_PRODUCT_CARD, SMALL_PRODUCT_CARD } from "../../../constants/types";
import { motion } from "framer-motion";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import {  FaXmark } from "react-icons/fa6";
import useFirebaseImageUrl from "../../../hooks/useFirebaseImageUrl";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../redux/slices/cartSlice";
import { toastNotify } from "../../toastify/toastNotify";
import { useEffect, useState } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { fadeInUp } from "../../../animations/variants";
import {
  addCart,
  addFavProduct,
  isFavProductLearn,
  removeFavProduct,
} from "../../../database/firestoreFunc";

const ProductCards = ({ type, product }) => {
  const [isAddedCart, setIsAddedCart] = useState(false);
  const [isFavProduct, setIsFavProduct] = useState(false);
  const { cart } = useSelector((state) => state.cartSlice);
  const { isLoggedIn, user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgUrl = useFirebaseImageUrl(product?.images.img1);
  //! Ürünün sepette olup olmadığını konrol etmek için
  useEffect(() => {
    if (cart.some((item) => item?.id === product?.id)) setIsAddedCart(true);
    else setIsAddedCart(false);
  }, [product, cart]);
  //! Ürünün favori ürün olduğunu kontrol için
  useEffect(() => {
    if (user?.uid) {
      const isFavProductLearnHandle = async () => {
        const isFavProductInfo = await isFavProductLearn(
          product?.id,
          user?.uid
        );
        setIsFavProduct(isFavProductInfo);
      };
      isFavProductLearnHandle();
    }
  }, []);
  //! Ürünü sepete ekleme işlemi
  const handleAddCart = async () => {
    if (!isLoggedIn) {
      toastNotify(ERROR, "You must log in to add products to the cart.");
      return;
    }

    await addCart(product, user.uid);
    dispatch(cartActions.addCart({ product }));
  };
  //! Ürünü favorilere ekleme/kaldırma işlemi
  const favProductHandle = async () => {
    if (!isLoggedIn) {
      toastNotify(
        ERROR,
        "You must log in to add products to the your favourites."
      );
      return;
    }
    //! Ürün favori ise kaldır değilse ekle
    if (isFavProduct) {
      await removeFavProduct(product.id, user.uid);
      setIsFavProduct(false);
    } else {
      await addFavProduct(product, user.uid);
      setIsFavProduct(true);
    }
  };

  switch (type) {
    case FEATURES_PRODUCT_CARD:
      return (
        <motion.div
          variants={fadeInUp}
          whileInView="open"
          initial="close"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-2    lg:p-3 xl:p-4"
        >
          <Card className="relative   hover:!border-slate-400 transition-colors  rounded-2xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] !bg-slate-100 !border-2 !border-slate-300">
            <Badge
              onClick={favProductHandle}
              color="failure"
              className="hover:bg-red-300 transition-colors cursor-pointer z-10 absolute top-5 right-5 w-max py-2"
            >
              {!isFavProduct ? <FaHeart /> : <FaXmark />}
            </Badge>

            {!imgUrl ? (
              <div className="h-40 w-full rounded-xl animate-pulse bg-slate-200 mx-auto" />
            ) : (
              <img
                loading="lazy"
                className="h-40  mx-auto object-contain hover:scale-105 ease duration-150 cursor-pointer"
                src={imgUrl}
                alt={product.title}
                onClick={() => navigate(`detail/${product.id}`)}
              />
            )}

            <h2 className="font-bold text-xl">{product.title}</h2>
            <Rating>
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Badge className="font-bold ms-2" color="indigo">
                5.0
              </Badge>
            </Rating>
            <div className="flex-between gap-2">
              <span className="text-gray-500 font-semibold">
                {product.brand}
              </span>
              <span className="font-bold text-xl text-gradient-r from-red-400 to-red-900 ">
                {product.price}$
              </span>
            </div>
            <Button
              disabled={isAddedCart}
              onClick={handleAddCart}
              className={` ${
                isAddedCart
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:-translate-y-1 hover:shadow-xl"
              }    hover:shadow-emerald-200 transition-transform bg-gradient-to-b from-emerald-300 to-emerald-500 font-semibold rounded-lg`}
            >
              {isAddedCart ? <BsFillCartCheckFill /> : <FaCartPlus />}

              {isAddedCart ? "Added cart" : "Add Cart"}
            </Button>
          </Card>
        </motion.div>
      );
    case SMALL_PRODUCT_CARD:
      return (
        <motion.div
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          initial={{ scale: 0.8, y: 40, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className=" relative    flex flex-col  justify-between bg-gradient-to-bl from-slate-300 to-zinc-200 rounded-lg py-4 px-2 xs:px-4"
        >
          {!imgUrl ? (
            <div className="h-16 w-full rounded-xl animate-pulse bg-slate-300 mx-auto" />
          ) : (
            <img
              onClick={() => navigate(`../detail/${product.id}`)}
              className="hover:scale-110 cursor-pointer transition-transform h-[70px] xs:h-[90px] object-contain mx-auto"
              src={imgUrl}
              alt={product.title}
            />
          )}
          <Badge
            onClick={favProductHandle}
            color="failure"
            className="hover:bg-red-300 transition-colors cursor-pointer absolute top-[5%] right-[7%] w-max py-2"
          >
            {!isFavProduct ? <FaHeart /> : <FaXmark />}
          </Badge>
          <h3 className="my-3 font-bold xs:text-lg mb-auto">{product.title}</h3>
          <div className="mt-1">
            <span className="font-bold  text-gradient-r  xs:text-lg from-red-400 to-red-900 ">
              {product.price}$
            </span>
            <Button
              disabled={isAddedCart}
              onClick={handleAddCart}
              className={`w-full mt-3 ${
                isAddedCart
                  ? "opacity-50  cursor-not-allowed"
                  : "hover:-translate-y-1 hover:shadow-xl"
              }   !text-sm  hover:shadow-emerald-200 transition-transform bg-gradient-to-b from-emerald-300 to-emerald-500 font-semibold rounded-lg`}
            >
              {isAddedCart ? <BsFillCartCheckFill /> : <FaCartPlus />}

              {isAddedCart ? "Added cart" : "Add Cart"}
            </Button>
          </div>
        </motion.div>
      );

    default:
      break;
  }
};

export default ProductCards;
