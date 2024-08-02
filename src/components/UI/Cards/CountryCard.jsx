import { motion } from "framer-motion";

const CountryCard = ({ item }) => {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      initial={{ scale: 0.8, y: 40, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-[450px]:w-3/4 min-[450px]:mx-auto sm:mx-0 sm:w-auto flex gap-4 bg-slate-200 p-6 sm:p-4 rounded-lg shadow-lg"
    >
      <img
        className="object-contain w-20 h-12 "
        src={`/img/sections/about/flags/${item.src}`}
        alt={item.name}
      />
      <div className="flex flex-col gap-2">
        <h6 className="font-bold text-2xl">{item.name}</h6>
        <address className="font-medium">
          {item.address.split("\n").map((desc, i) => (
            <span key={i}>
              {desc} <br />
            </span>
          ))}
        </address>
      </div>
    </motion.div>
  );
};

export default CountryCard;
