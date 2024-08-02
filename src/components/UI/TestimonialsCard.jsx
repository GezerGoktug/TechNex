import { Card, Rating } from "flowbite-react";
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const TestimonialsCard = ({ item }) => {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      initial={{ scale: 0.8, y: 40, opacity: 0 }}
      transition={{ duration: 0.5}}
      className="relative py-10 xl:py-12 px-2 xl:px-4  "
    >
      <Card className=" !bg-gradient-to-b !from-zinc-200 min-h-[300px] !to-slate-300 border-none text-center">
        <FaQuoteLeft className="absolute top-0 xl:left-12  text-7xl    xl:text-8xl" />
        <img
          className=" h-16  mx-auto rounded-full"
          src="https://i.pravatar.cc/300"
          alt={item.name}
        />
        <h6 className="font-bold text-xl">{item.name}</h6>
        <Rating className="mx-auto ">
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
        </Rating>
        <p className="italic">{item.comment}</p>
      </Card>
    </motion.div>
  );
};

export default TestimonialsCard;
