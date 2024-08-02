import DetailPicture from "../components/layout/ProductDetail/DetailPicture";
import DetailContent from "../components/layout/ProductDetail/DetailContent";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import Button from "../components/UI/Button";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { FaCommentAlt } from "react-icons/fa";
import Reviews from "../components/layout/ProductDetail/Reviews";
import Features from "../components/layout/ProductDetail/Features";
import { useState } from "react";
import Skeletons from "../components/UI/Skeletons";
import useReviews from "../hooks/useReviews";

const Detail = () => {
  const { productID } = useParams();
  const {loading,product} = useReviews(productID)
  const [sectionChange, setSectionChange] = useState(true);
  return (
    <div className="custom-container  my-32 ">
      {loading ? (
        <Skeletons />
      ) : (
        <>
          <Breadcrumb
            className="my-4 [&_svg]:!text-slate-400  "
            aria-label="Default breadcrumb example"
          >
            <Breadcrumb.Item className="cursor-pointer [&_a]:hover:!text-slate-900" icon={HiHome}>
           <Link to="../">
              Home
           </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="cursor-pointer [&_a]:hover:!text-slate-900">
            <Link to="../products">
            Products
            </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{product?.title}</Breadcrumb.Item>
          </Breadcrumb>
          <section className="col-start sm:flex-row  gap-6 lg:gap-12">
            {product && (
              <>
                <DetailPicture sources={product} />
                <DetailContent content={product} />
              </>
            )}
          </section>
          <section className="mt-6">
            <div className="flex  w-max border-b-2 border-slate-400">
              <Button
                onClick={() => setSectionChange(true)}
                className={`${
                  sectionChange ? "bg-slate-300" : "bg-slate-200"
                } hover:bg-slate-300 rounded-ss-lg`}
              >
                <MdOutlineFeaturedPlayList />
                Features
              </Button>
              <Button
                onClick={() => setSectionChange(false)}
                className={` ${
                  !sectionChange ? "bg-slate-300" : "bg-slate-200"
                } hover:bg-slate-300 rounded-se-lg`}
              >
                <FaCommentAlt />
                Reviews
              </Button>
            </div>
          </section>
          <section className="mt-2     ">
            {product &&
              (sectionChange ? (
                <Features features={product?.features} />
              ) : (
                <Reviews ID={productID} comments={product?.comments} />
              ))}
          </section>
        </>
      )}
    </div>
  );
};

export default Detail;
