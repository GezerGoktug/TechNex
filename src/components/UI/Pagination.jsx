import { useState } from "react";
import Button from "./Button";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const [pageArray, setPageArray] = useState([1, 2, 3, 4, 5]);

  const handleNextPage = () => {
    if (
      currentPage + 3 > Math.max(...pageArray) &&
      !(currentPage + 3 > totalPages)
    )
      setPageArray((prevState) => prevState.map((item) => item + 1));
    if (!(currentPage + 1 > totalPages))
      setCurrentPage((prevState) => prevState + 1);
  };
  const handleClickPage = (index) => {
    if (index === Math.max(...pageArray) && !(index === totalPages)) {
      if (Math.max(...pageArray) + 2 > totalPages)
        setPageArray((prevState) => prevState.map((item) => item + 1));
      else setPageArray((prevState) => prevState.map((item) => item + 2));
    } else if (
      index === Math.max(...pageArray) - 1 &&
      !(Math.max(...pageArray) + 1 > totalPages)
    )
      setPageArray((prevState) => prevState.map((item) => item + 1));
    else if (index === Math.min(...pageArray) && !(index === 1)) {
      if (Math.min(...pageArray) - 2 === 0)
        setPageArray((prevState) => prevState.map((item) => item - 1));
      else setPageArray((prevState) => prevState.map((item) => item - 2));
    } else if (
      index === Math.min(...pageArray) + 1 &&
      !(Math.min(...pageArray) - 1 === 0)
    )
      setPageArray((prevState) => prevState.map((item) => item - 1));

    setCurrentPage(index);
  };
  const handlePrevPage = () => {
    if (currentPage - 3 < Math.min(...pageArray) && !(currentPage - 4 < 0))
      setPageArray((prevState) => prevState.map((item) => item - 1));
    if (!(currentPage - 1 === 0)) setCurrentPage((prevState) => prevState - 1);
  };

  return (
    <div className="flex w-max mx-auto bg-slate-200  rounded-lg">
      <Button
        onClick={handlePrevPage}
        className={`  ${
          currentPage - 1 === 0
            ? "cursor-not-allowed bg-zinc-200"
            : "cursor-pointer hover:bg-slate-300"
        } !text-sm border-e border-slate-300  rounded-s-lg `}
      >
        Previous
      </Button>
      {pageArray.map((item, i) => (
        <Button
          key={i}
          onClick={() => handleClickPage(item)}
          className={`  border-e ${
            currentPage === item && "bg-slate-400"
          } border-slate-300 !text-sm  hover:bg-slate-400`}
        >
          {item}
        </Button>
      ))}
      <Button
        onClick={handleNextPage}
        className={` !text-sm ${
          currentPage === totalPages
            ? "cursor-not-allowed bg-zinc-200"
            : "cursor-pointer hover:bg-slate-300"
        }   rounded-e-lg `}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
