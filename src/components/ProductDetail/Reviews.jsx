import { fadeInRights } from "../../animations/variants";
import CommentCard from "./CommentCard";
import { motion } from "framer-motion";

const Reviews = ({ comments }) => {
  return (
    <>
      <h6 className="font-semibold text-3xl my-6">
        {Object.keys(comments).length} Comments
      </h6>
      <motion.div
        variants={fadeInRights}
        whileInView="open"
        initial="close"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col gap-6"
      >
        {Object.keys(comments).map((key) => (
          <CommentCard key={key} item={comments[key]} />
        ))}
      </motion.div>
    </>
  );
};

export default Reviews;
