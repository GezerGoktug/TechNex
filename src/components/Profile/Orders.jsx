import { doc, getDoc } from "firebase/firestore";
import { Table } from "flowbite-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import CartTableItem from "../Cart/CartTableItem";
import { fadeInUp } from "../../animations/variants";
import { FaBoxOpen } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from "../UI/Button";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state.authSlice);
  useEffect(() => {
    //! Sipariş verilerini al
    const getOrders = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const { orders } = docSnap.data();
      setOrders(Object.keys(orders).map((key) => orders[key]));
    };
    getOrders();
  }, []);

  return (
    <motion.section
      variants={fadeInUp}
      whileInView="open"
      initial="close"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="py-8 px-2 "
    >
      {orders.length > 0 ? (
        <Table className="bg-slate-300 ">
          <Table.Head className="!text-white">
            <Table.HeadCell className="!rounded-none !bg-indigo-800">
              İmage
            </Table.HeadCell>
            <Table.HeadCell className=" !bg-indigo-800">
              Product name
            </Table.HeadCell>
            <Table.HeadCell className=" !bg-indigo-800">
              Quantity
            </Table.HeadCell>
            <Table.HeadCell className=" !bg-indigo-800">
              Category
            </Table.HeadCell>
            <Table.HeadCell className=" !bg-indigo-800 !rounded-none">
              Price
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y  text-black">
            {orders.map((item, i) => (
              <CartTableItem key={i} item={item} isOrderItem={1} />
            ))}
          </Table.Body>
        </Table>
      ) : (
        <div className="  my-12  col-span-5 text-center col-center gap-4">
          <FaBoxOpen className="text-8xl" />
          <div className="text-3xl font-semibold">There are no orders</div>
          <p className="font-medium text-xl">Let{"'"}s order some</p>
          <Link to="../cart">
            <Button className="bg-indigo-600 rounded-lg hover:bg-indigo-700  text-white ">
              Go to cart
            </Button>
          </Link>
        </div>
      )}
    </motion.section>
  );
};

export default Orders;
