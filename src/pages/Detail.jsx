import DetailPicture from "../components/layout/PageLayoutComponents/ProductDetail/DetailPicture";
import DetailContent from "../components/layout/PageLayoutComponents/ProductDetail/DetailContent";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import Button from "../components/UI/Button";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { FaCommentAlt } from "react-icons/fa";
import Reviews from "../components/layout/PageLayoutComponents/ProductDetail/Reviews";
import Features from "../components/layout/PageLayoutComponents/ProductDetail/Features";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import Skeletons from "../components/UI/Skeletons";

const Detail = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //! Ürün detay verilerini al
    const unsubscribe = onSnapshot(
      doc(db, "products", productID),
      (productSnap) => {
        if (productSnap.exists()) {
          const productData = productSnap.data();
          setProduct({ ...productData, id: productID });
          setLoading(false);
        } else {
          console.log("No such document!");
          setProduct(null);
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, [productID]);

  const [sectionChange, setSectionChange] = useState(true);
  return (
    <div className="custom-container  my-32 ">
      {loading ? (
        <Skeletons />
      ) : (
        <>
          <Breadcrumb
            className="my-4 breadcrumb"
            aria-label="Default breadcrumb example"
          >
            <Breadcrumb.Item href="#" icon={HiHome}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
            <Breadcrumb.Item>{product?.title}</Breadcrumb.Item>
          </Breadcrumb>
          <section className="flex flex-col sm:flex-row items-start gap-6 lg:gap-12">
            {product && (
              <>
                <DetailPicture sources={product} />
                <DetailContent content={product} />
              </>
            )}
          </section>
          <div className="mt-6">
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
          </div>
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
