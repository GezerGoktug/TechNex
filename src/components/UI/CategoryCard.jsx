import { Card } from "flowbite-react";

const CategoryCard = ({ item, onClick }) => {
  return (
    <Card
      style={{
        backgroundImage: "url(/img/sections/products/backgroundFrame.jpg)",
      }}
      className={`shadow-none  text-center cursor-pointer outline-offset-2 transition-all outline outline-transparent hover:outline-red-600   bg-center bg-cover bg-no-repeat   border-none  rounded-ss-3xl rounded-ee-3xl gap-12`}
    >
      <img
        className=" object-contain h-[50px]  hover:scale-125 transition-transform "
        src={item.src}
        alt={item.title}
        onClick={onClick}
      />
      <h5 className=" text-lg mt-2 font-bold text-gradient-r from-blue-100 to-indigo-300 ">
        {item.title}
      </h5>
    </Card>
  );
};

export default CategoryCard;
