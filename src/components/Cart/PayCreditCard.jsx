import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { cartActions } from "../../redux/slices/cartSlice";
import { useFormik } from "formik";
import {payFormSchema} from "../../schemas/payFormSchema"
import { Card, Select } from "flowbite-react";
import Input from "../UI/Input";
import { RiCoupon2Fill } from "react-icons/ri";
import Button from "../UI/Button";
import { CiCreditCard1 } from "react-icons/ci";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaLock } from "react-icons/fa6";

const PayCreditCard = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartSlice);
  const { user } = useSelector((state) => state.authSlice);
  const [payImgSrc, setPayImgSrc] = useState(null);

  //! Ödeme yöntemi seçme 
  const handlePayType = (e) => {
    if (e.target.value === "visa") setPayImgSrc("visa.png");
    else if (e.target.value === "mastercard") setPayImgSrc("mastercard.png");
    else if (e.target.value === "paypal") setPayImgSrc("paypal.png");
  };
  //! Siparişi veritabanına kaydeder
  const onSubmit = async (values, actions) => {
    //! Veriyi uygun şekilde hazırla
    const orderItems = cart.reduce((acc, item) => {
      acc[item.id] = {
        images: item.images,
        quantity: item.quantity,
        price: item.price,
        title: item.title,
        category: item.category,
        createdOrder: serverTimestamp(),
      };
      return acc;
    }, {});

    //! Veritabanına kaydet
    const docs = await getDoc(doc(db, "users", user.uid));
    await updateDoc(doc(db, "users", user.uid), {
      orders: {
        ...docs.data().orders,
        ...orderItems,
      },
    });
    //! Kullanıcı sepeti sıfırla
    await updateDoc(doc(db, "users", user.uid), {
      cart: {},
    });

    //! Sepet state ini sıfırla
    dispatch(cartActions.clearCart());
    actions.resetForm();
    window.alert("Siparişiniz başarı ile verilmiştir");
  };
  //! Formik Ayarları
  const {
    values,
    handleBlur,
    errors,
    touched,
    handleChange,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      couponCode: "",
      payType: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      terms: false,
    },
    onSubmit,
    validationSchema: payFormSchema,
  });
  //! Kredi kartı inputu maskeleme(formatlama)
  const formatterCreditCard = (e) => {
    if (e.target.value.length === 4)
      setFieldValue("cardNumber", `${e.target.value} `);
    else if (e.target.value.length === 9)
      setFieldValue("cardNumber", `${e.target.value} `);
    else if (e.target.value.length === 14)
      setFieldValue("cardNumber", `${e.target.value} `);
    else if (e.target.value.length === 20) return;
    else setFieldValue("cardNumber", e.target.value);
  };
  //!   son kullanım tarihi inputu maskeleme(formatlama)
  const formatterExpiryDate = (e) => {
    if (e.target.value.length === 2)
      setFieldValue("expiryDate", `${e.target.value}/`);
    else if (e.target.value.length === 6) return;
    else setFieldValue("expiryDate", e.target.value);
  };
  return (
    <Card className="!bg-slate-300 rounded-none mt-6 border-none">
      <form onSubmit={handleSubmit}>
        <Input
          onBlur={handleBlur}
          value={values.couponCode}
          name="couponCode"
          onChange={handleChange}
          type="number"
          className={`mb-2 ${
            touched.couponCode && errors.couponCode
              ? "!border-red-700 !bg-red-300"
              : touched.couponCode && "!border-green-700 !bg-green-300"
          }`}
          leftIcon={<RiCoupon2Fill className="ms-1 text-xl" />}
          placeholder="Coupon Code"
        />
        {errors.couponCode && (
          <span className="text-red-400 text-sm font-medium block my-2">
            {errors.couponCode}
          </span>
        )}
        <Button className="bg-blue-500 text-white w-full rounded-xl hover:bg-blue-600">
          Apply
        </Button>
        <div className="text-xl my-4 text-center italic font-semibold">
          later
        </div>
        <Select
          onBlur={handleBlur}
          name="payType"
          onChange={(event) => {
            handlePayType(event);
            handleChange(event);
          }}
          value={values.payType}
          color=""
          required
        >
          <option value="" disabled>
            Select pay type
          </option>
          <option value="visa">VISA</option>
          <option value="mastercard">MasterCard</option>
          <option value="paypal">PayPal</option>
        </Select>

        {payImgSrc && (
          <img
            className="my-16 lg:my-10 object-contain w-full  h-36 lg:h-48 px-8"
            src={`/img/sections/cartİmg/${payImgSrc}`}
            alt="pay-type"
          />
        )}
        {errors.payType && (
          <span className="text-red-400 text-sm font-medium block my-2">
            {errors.payType}
          </span>
        )}

        <Input
          onBlur={handleBlur}
          value={values.cardNumber}
          name="cardNumber"
          className={`my-2 ${
            touched.cardNumber && errors.cardNumber
              ? "!border-red-700 !bg-red-300"
              : touched.cardNumber && "!border-green-700 !bg-green-300"
          }`}
          onChange={formatterCreditCard}
          leftIcon={<CiCreditCard1 className="ms-1 text-xl" />}
          placeholder="0000 0000 0000 0000"
        />
        {errors.cardNumber && (
          <span className="text-red-400 text-sm font-medium block my-2">
            {errors.cardNumber}
          </span>
        )}

        <div className="flex gap-2">
          <Input
            onBlur={handleBlur}
            value={values.expiryDate}
            name="expiryDate"
            onChange={formatterExpiryDate}
            className={`w-1/2 ${
              touched.expiryDate && errors.expiryDate
                ? "!border-red-700 !bg-red-300"
                : touched.expiryDate && "!border-green-700 !bg-green-300"
            }`}
            leftIcon={<MdOutlineCalendarMonth className="ms-1 text-xl" />}
            placeholder="00/00"
          />
          <Input
            onBlur={handleBlur}
            value={values.cvv}
            name="cvv"
            onChange={handleChange}
            className={`w-1/2 ${
              touched.cvv && errors.cvv
                ? "!border-red-700 !bg-red-300"
                : touched.cvv && "!border-green-700 !bg-green-300"
            }`}
            type="number"
            leftIcon={<FaLock className="ms-1 text-xl" />}
            placeholder="000"
          />
        </div>
        {errors.expiryDate && (
          <span className="text-red-400 text-sm font-medium block my-2">
            {errors.expiryDate}
          </span>
        )}
        {errors.cvv && (
          <span className="text-red-400 text-sm font-medium block my-2">
            {errors.cvv}
          </span>
        )}

        <div className="flex items-start gap-2 mt-3">
          <input
            name="terms"
            onChange={handleChange}
            onBlur={handleBlur}
            checked={values.terms}
            required
            type="checkbox"
            className="scale-125 mt-2   "
          />
          <span className=" font-bold">
            I have read and accept the purchase, cookie policy and privacy terms
            agreement
          </span>
        </div>
        <Button
          type="submit"
          className="bg-blue-500 mt-3 text-white w-full rounded-xl hover:bg-blue-600"
        >
          Go to cash panel
        </Button>
      </form>
    </Card>
  );
};

export default PayCreditCard;
