import Button from "./Button";
import { motion } from "framer-motion";

const CampaignItem = ({ variant, title, description, imageUrl, className }) => (
  <motion.div
    variants={variant}
    whileInView="open"
    initial="close"
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.3 }}
    className={`bg-center bg-no-repeat bg-cover h-96 lg:h-72 px-6 pt-12 ${className}`}
    style={{
      background: `linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.813) 0%,
          rgba(0, 0, 0, 0.288) 100%
        ), url(${imageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <h3 className="font-semibold text-2xl">{title}</h3>
    <p className="my-4">{description}</p>
    <Button className="bg-transparent rounded hover:bg-white hover:text-black outline outline-slate-100">
      View
    </Button>
  </motion.div>
);

export default CampaignItem;
