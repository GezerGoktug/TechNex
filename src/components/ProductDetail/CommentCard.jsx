import dayjs from "dayjs";
import { Badge, Rating } from "flowbite-react";
import relativeTime from "dayjs/plugin/relativeTime";
import { createRatingArray } from "../../helpers/createRatingArray";

const CommentCard = ({ item }) => {
  dayjs.extend(relativeTime);

  return (
    <div className="flex gap-4">
      <img
        className="size-16 rounded-full"
        src={item.imgSrc}
        alt={item.name}
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-x-3 gap-y-1 items-center">
          <h6 className="font-bold">@{item.name}</h6>
          <span className="text-gray-500 text-sm">
            {dayjs.unix(item.time?.seconds).fromNow()}
          </span>
        </div>
        <Rating size="xs">
          {createRatingArray(item.rating).map((item, i) => (
            <Rating.Star key={i} filled={item} />
          ))}

          <Badge className="font-bold ms-2 text-[10px]" size="" color="indigo">
            {item.rating.toFixed(1)}
          </Badge>
        </Rating>
        <p>{item.comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
