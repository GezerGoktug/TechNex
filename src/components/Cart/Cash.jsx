import { Card } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Cash = () => {
  const [fastCargo, setFastCargo] = useState(0);
  const { cart } = useSelector((state) => state.cartSlice);
  const fastCargoHandle = (e) => {
    if (e.target.checked) setFastCargo(10);
    else setFastCargo(0);
  };
  //! Fiyat hesaplama
  const price = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
  return (
    <Card className="rounded-none border-none !bg-blue-500 text-white">
      <h4 className="text-2xl font-bold">Cash</h4>
      <ul className="flex flex-col gap-2 mt-2">
        <li className="flex-between">
          <span>Subtotal:</span>
          <span className="font-bold text-xl">{price}$</span>
        </li>
        <li className="flex-between pb-4 border-b-2 border-slate-100">
          <span>Cargo Price:</span>
          <span className="font-bold text-xl">{fastCargo}$</span>
        </li>
        <li className="flex-between    ">
          <span>Total Price:</span>
          <span className="font-bold text-xl">{price + fastCargo}$</span>
        </li>
      </ul>
      <div className="flex items-center gap-2">
        <input
          onClick={fastCargoHandle}
          type="checkbox"
          className="scale-125  accent-emerald-800 "
        />
        <span className="text-gray-200 font-bold">Fast Cargo</span>
      </div>
    </Card>
  );
};

export default Cash;
