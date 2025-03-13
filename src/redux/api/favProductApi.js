import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const favProductsApi = createApi({
  reducerPath: "favProductsApi",
  baseQuery: fakeBaseQuery,
  endpoints: (builder) => ({
    getFavouriteProducts: builder.query({
      queryFn: async (userId) => {
        try {
          const docRef = doc(db, "users", userId);
          const querySnapshot = await getDoc(docRef);

          
          const arr = querySnapshot.data().favouritesProducts;
          const favProducts = Object.keys(arr).map((key) => arr[key]);

          return { data: favProducts };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Fav_Products"],
    }),
  }),
});

export const { useGetFavouriteProductsQuery } = favProductsApi;
