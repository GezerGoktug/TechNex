import { Table } from "flowbite-react";
import { FaTrash } from "react-icons/fa6";
import Button from "../../UI/Button";
import CartTableItem from "../../UI/CartTableItem";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../redux/slices/cartSlice";
import { clearCart } from "../../../database/firestoreFunc";

const CartTable = () => {
  const { cart } = useSelector((state) => state.cartSlice);
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  //! Sepet temizleme fonksiyonu
  const clearCartHandle = async () => {
    await clearCart(user.uid);
    dispatch(cartActions.clearCart());
  };
  return (
    <>
      <div className="overflow-x-auto  ">
        <Table className="bg-slate-300 ">
          <Table.Head className="!text-white">
            <Table.HeadCell className="!rounded-none !bg-emerald-800">
              İmage
            </Table.HeadCell>
            <Table.HeadCell className=" !bg-emerald-800">
              Product name
            </Table.HeadCell>
            <Table.HeadCell className=" !bg-emerald-800">
              Quantity
            </Table.HeadCell>
            <Table.HeadCell className=" !bg-emerald-800">
              Category
            </Table.HeadCell>
            <Table.HeadCell className=" !bg-emerald-800">Price</Table.HeadCell>
            <Table.HeadCell className="!rounded-none !bg-emerald-800">
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y  text-black">
            {cart.length === 0 ? (
              <Table.Row className="h-48 w-full text-center ">
                <Table.Cell
                  colSpan="5"
                  className="text-4xl font-bold text-gray-500"
                >
                  Empty is Cart
                </Table.Cell>
              </Table.Row>
            ) : (
              cart.map((item, index) => (
                <CartTableItem key={index} item={item} />
              ))
            )}
          </Table.Body>
        </Table>
      </div>
      <Button
        onClick={clearCartHandle}
        className="bg-red-700 hover:bg-red-800 text-white rounded-lg mt-4"
      >
        <FaTrash />
        Clear Cart
      </Button>
    </>
  );
};

export default CartTable;
