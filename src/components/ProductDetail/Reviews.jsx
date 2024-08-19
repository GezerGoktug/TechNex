import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addComment } from "../../database/firestoreFunc";
import { fadeInLeft, fadeInRights } from "../../animations/variants";
import { Rating } from "flowbite-react";
import Button from "../UI/Button";
import CommentCard from "./CommentCard";
import { findIndex } from "../../helpers/findİndex";
import { motion } from "framer-motion";

const Reviews = ({ comments, ID }) => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.authSlice);
  const [comment, setComment] = useState("");
  const [hoverStars, setHoverStars] = useState([0, 0, 0, 0, 0]);
  const [stars, setStars] = useState([0, 0, 0, 0, 0]);

  //! Yorum ekleme
  const handleComment = async (e) => {
    e.preventDefault();
    const newComment = {
      uid: user.uid,
      comment: comment,
      imgSrc: user.photoURL,
      name: user.userName,
      time: serverTimestamp(),
      rating: findIndex(stars) + 1,
    };
    await addComment(newComment, ID);
    setComment("");
    setStars([0, 0, 0, 0, 0]);
  };

  //! Üzerine gelince yıldızların boyanma durumları ayarlanır
  const hoverStar = (i) => {
    setHoverStars(
      hoverStars.map((item, index) => {
        if (index <= i) return 1;
        else return 0;
      })
    );
  };
  //! Eğer yıldız üzerine tıklanırsa boyalı olcak yıldız sayısını tutan state güncellenir
  const handleClickStar = (i) => {
    if (findIndex(stars) === i) {
      setStars([0, 0, 0, 0, 0]);
      return;
    }

    setStars(
      stars.map((item, index) => {
        if (index <= i) return 1;
        else return 0;
      })
    );
  };
  return (
    <>
      {isLoggedIn ? (
        <motion.div
          variants={fadeInLeft}
          whileInView="open"
          initial="close"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className=" flex gap-4 my-8"
        >
          <img
            className=" size-8 xs:size-16 bg-slate-700  rounded-full"
            src={user.photoURL}
            alt={user.userName}
          />
          <div className=" flex flex-col w-full sm:w-3/4 lg:w-1/2   gap-2">
            <h6 className="font-bold">@{user.userName}</h6>
            <Rating size="sm">
              {[0, 1, 2, 3, 4].map((item) => (
                <Rating.Star
                  onClick={() => handleClickStar(item)}
                  key={item}
                  filled={hoverStars[item]}
                  onMouseLeave={() => setHoverStars(stars)}
                  onMouseEnter={() => hoverStar(item)}
                  className="hover:text-yellow-500 cursor-pointer"
                />
              ))}
            </Rating>
            <form onSubmit={handleComment}>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                type="text"
                placeholder="Add comment"
                className="bg-transparent min-h-28 max-h-56 w-full  p-2 border-2 border-slate-300 rounded-xl outline-none"
              />
              <Button
                type="submit"
                className="bg-indigo-600 rounded-lg mt-4 hover:bg-indigo-700 text-white  !text-sm"
              >
                Add Comment
              </Button>
            </form>
          </div>
        </motion.div>
      ) : (
        <div className="text-3xl font-medium my-12">
          <div>You must be logged in to post a comment</div>
          <Button
            onClick={() => navigate("../auth")}
            className="bg-indigo-600 mt-4 text-white rounded-lg hover:bg-indigo-700"
          >
            Log in
          </Button>
        </div>
      )}

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
