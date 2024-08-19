import { Badge, Rating, Select } from "flowbite-react";
import { FaCartPlus, FaHeart, FaMinus, FaPlus, FaXmark } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCartCheckFill } from "react-icons/bs";
import { addCart, addFavProduct, isFavProductLearn, removeFavProduct } from "../../database/firestoreFunc";
import { ERROR } from "../../constants/types";
import { toastNotify } from "../toastify/toastNotify";
import { cartActions } from "../../redux/slices/cartSlice";
import { fadeInRights } from "../../animations/variants";
import Button from "../UI/Button";



const DetailContent = ({ content }) => {
  const [isFavProduct, setIsFavProduct] = useState(false);
  const [colorOpt, setColorOpt] = useState(content.colorOptions[0]);
  const [isAddedCart, setIsAddedCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { isLoggedIn, user } = useSelector((state) => state.authSlice);
  const { cart } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    //! Ürün sepette ise ilgili state i güncelle
    if (cart.some((item) => item?.id === content?.id)) setIsAddedCart(true);
    else setIsAddedCart(false);
  }, [content, cart]);
  useEffect(() => {
    //! Ürün favori ürün ise ilgili state i güncelle
    if (user?.uid) {
      const isFavProductLearnHandle = async () => {
        const isFavProductInfo =await isFavProductLearn(content?.id,user?.uid)
        setIsFavProduct(isFavProductInfo)
      };
      isFavProductLearnHandle();
    }
  }, []);
  //! Detay sayfası sepete ürün ekleme fonksiyonu
  const detailPageHandleAddCart = async () => {
    if (!isLoggedIn) {
      toastNotify(ERROR, "You must log in to add products to the cart.");
      return;
    }

    await addCart(content, user.uid, quantity);
    dispatch(cartActions.addCart({ product: content, quantity }));
  };
  //! Detay sayfası favori ürün olayları fonksiyonu
  const favProductHandle = async () => {
    if (!isLoggedIn) {
      toastNotify(
        ERROR,
        "You must log in to add products to the your favourites."
      );
      return;
    }
    //! Tıklandığında eğer ürün favori ürün ise
    //! kaldırır eğer değilse favori ürünlere ekler
    if (isFavProduct) {
      await removeFavProduct(content.id, user.uid);
      setIsFavProduct(false);
    } else {
      await addFavProduct(content, user.uid);
      setIsFavProduct(true);
    }
  };
  return (
    <motion.div
      variants={fadeInRights}
      animate="open"
      initial="close"
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full sm:w-1/2"
    >
      <h3 className="font-bold text-4xl lg:text-5xl mb-4">{content.title}</h3>
      <div className="mb-4 font-bold text-gray-500">{content.brand}</div>
      <span className="font-bold text-gradient-r italic  text-3xl from-red-400 to-red-900 ">
        {content.price}$
      </span>
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <Rating size="md">
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Badge className="font-bold ms-2" color="indigo">
            5.0
          </Badge>
        </Rating>
        <span className="font-medium text-gray-500">
          ({Object.keys(content.comments).length} reviews)
        </span>
      </div>
      <p className="mt-4 font-medium">{content.desc}</p>
      <ul className="mt-6 grid grid-cols-3 min-[430px]:grid-cols-4 font-semibold text-sm sm:grid-cols-3  text-center lg:grid-cols-4 gap-2">
        {content.highlights.map((item, i) => (
          <li
            key={i}
            className="bg-gradient-to-tl   from-indigo-200 to-cyan-200 p-3 rounded-md "
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="flex items-center mt-6 gap-3">
        <div className="w-1/3 lg:w-1/4 flex-center gap-3 text-xl text-white">
          <div
            onClick={() => {
              quantity !== 1 &&
                !isAddedCart &&
                setQuantity((prevState) => prevState - 1);
            }}
            className="bg-emerald-800 cursor-pointer hover:bg-emerald-700 p-2 text-base rounded-lg flex-center"
          >
            <FaMinus />
          </div>
          <span className="text-black font-medium">
            {isAddedCart
              ? cart.find((item) => item.id === content.id).quantity
              : quantity}
          </span>
          <div
            onClick={() => {
              !isAddedCart && setQuantity((prevState) => prevState + 1);
            }}
            className="bg-emerald-800 p-2 cursor-pointer hover:bg-emerald-700 text-base  rounded-lg flex-center"
          >
            <FaPlus />
          </div>
        </div>
        <Badge
          onClick={favProductHandle}
          color="failure"
          size="lg"
          className="p-3 hover:bg-red-300 cursor-pointer transition-colors   "
        >
          {!isFavProduct ? <FaHeart /> : <FaXmark />}
        </Badge>
      </div>
      <div className="flex items-center gap-2 mt-6">
        <Select
          disabled={isAddedCart}
          value={
            isAddedCart
              ? cart.find((item) => item.id === content.id).colorChoose
              : colorOpt
          }
          onChange={(e) => setColorOpt(e.target.value)}
          color="success"
          className="w-1/3 lg:w-1/4"
        >
          {content.colorOptions.map((item, i) => (
            <option value={item} key={i}>
              {item}
            </option>
          ))}
        </Select>
        <Button
          disabled={isAddedCart}
          onClick={detailPageHandleAddCart}
          className={`${
            isAddedCart
              ? "opacity-50 cursor-not-allowed"
              : "hover:-translate-y-1 hover:shadow-xl"
          } w-2/3 lg:w-3/4    hover:shadow-emerald-200 transition-transform bg-gradient-to-b from-emerald-300 to-emerald-500 font-semibold rounded-lg`}
        >
          {isAddedCart ? <BsFillCartCheckFill /> : <FaCartPlus />}
          {isAddedCart ? "Added to cart" : "Add Cart"}
        </Button>
      </div>
    </motion.div>
  );
};

export default DetailContent;
