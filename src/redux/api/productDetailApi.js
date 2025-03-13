import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const productDetailApi = createApi({
  reducerPath: "productDetailApi",
  baseQuery: fakeBaseQuery,
  endpoints: (builder) => ({
    getProductDetail: builder.query({
      queryFn: async (productID) => {
        try {
          const docRef = doc(db, "products", productID);
          const querySnapshot = await getDoc(docRef);
          const product = { ...querySnapshot.data(), id: productID };
          
          Object.keys(product.comments).forEach((comment) => {            
            product.comments[comment].time =
              product.comments[comment].time.seconds;
          });

          return { data:product };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Product_Detail"],
    }),
  }),
});

export const { useGetProductDetailQuery } = productDetailApi;
