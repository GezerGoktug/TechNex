import { Table } from "flowbite-react";
import Button from "../UI/Button";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import useFirebaseImageUrl from "../../hooks/useFirebaseImageUrl";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeCart,
} from "../../database/firestoreFunc";

const CartTableItem = ({ isOrderItem, item }) => {
  const imgUrl = useFirebaseImageUrl(item?.images.img1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //! Birinci miktar artırma işlemi bitmeden tekrar basılması durumunu engellemek için
  //!  Çünkü ardı ardına cok hızlı basılması durumunda veritabanı bu duruma yetişemez
  const [doQuantityOperations, setDoQuantityOperations] = useState(true);
  //! Ürün miktarını artırma işlemi
  const increaseHandle = async () => {
    if (!doQuantityOperations) return;
    await increaseQuantity(item, setDoQuantityOperations);
    dispatch(cartActions.increaseQuantity({ product: item }));
  };
  //! Ürün miktarını azaltma işlemi
  const decreaseHandle = async () => {
    if (!doQuantityOperations) return;
    //! Eğer miktar 1 ise ürünü sepetten çıkar
    if (item.quantity === 1) await removeCart(item);
    else await decreaseQuantity(item, setDoQuantityOperations);

    dispatch(cartActions.decreaseQuantity({ product: item }));
  };
  //! Ürünü sepetten kaldırma işlemi
  const removeItemHandle = async () => {
    await removeCart(item);
    dispatch(cartActions.removeCart({ product: item }));
  };
  return (
    <Table.Row className="bg-slate-300 hover:bg-[#bfc8d2] transition-colors ">
      <Table.Cell>
        <img
          onClick={() => navigate(`../detail/${item.id}`)}
          className="h-16 object-contain cursor-pointer "
          src={imgUrl}
          alt={item.title}
        />
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium ">
        {item.title}
      </Table.Cell>
      <Table.Cell>
        <div className="flex gap-3 items-center text-sm text-white">
          {!isOrderItem && (
            <div
              onClick={decreaseHandle}
              className="bg-emerald-800 cursor-pointer hover:bg-emerald-700 p-2 text-[10px]  rounded-lg flex-center"
            >
              <FaMinus />
            </div>
          )}
          <span className="text-black  font-medium">{item.quantity}</span>
          {!isOrderItem && (
            <div
              onClick={increaseHandle}
              className="bg-emerald-800 p-2 cursor-pointer hover:bg-emerald-700 text-[10px] rounded-lg flex-center"
            >
              <FaPlus />
            </div>
          )}
        </div>
      </Table.Cell>
      <Table.Cell>{item.category}</Table.Cell>
      <Table.Cell className="text-red-900 font-bold">{item.price}$</Table.Cell>
      {!isOrderItem && (
        <Table.Cell>
          <Button
            onClick={removeItemHandle}
            className="bg-red-700 hover:bg-red-800  rounded-lg !text-base text-white"
          >
            <FaTrash />
            Remove
          </Button>
        </Table.Cell>
      )}
    </Table.Row>
  );
};

export default CartTableItem;
