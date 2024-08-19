import { Badge } from "flowbite-react";


const FiltreTag = ({ tagContent }) => {
  return (
    <Badge
      className="w-max rounded-xl py-1 cursor-pointer hover:bg-indigo-300 transition-colors "
      size="md"
      color="indigo"
    >
      {tagContent}
    </Badge>
  );
};

export default FiltreTag;
