import { fadeInLeft, fadeInRights } from "../animations/variants";
import CartTable from "../components/layout/Cart/CartTable";
import Cash from "../components/layout/Cart/Cash";
import PayCreditCard from "../components/layout/Cart/PayCreditCard";
import { motion } from "framer-motion";

const Cart = () => {
  return (
    <section className="mt-40 custom-container">
      <h3 className="mb-12 font-extrabold text-5xl font-serif">My Cart</h3>
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        <motion.div
          variants={fadeInLeft}
          animate="open"
          initial="close"
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:w-[60%]  xl:w-2/3"
        >
          <CartTable />
        </motion.div>
        <motion.div
          variants={fadeInRights}
          animate="open"
          initial="close"
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:w-[40%]  xl:w-1/3"
        >
          <Cash />
          <PayCreditCard />
        </motion.div>
      </div>
    </section>
  );
};

export default Cart;
