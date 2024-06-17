import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { toastNotify } from "../components/toastify/toastNotify";
import types from "../constants/types";
import { v7 as uuidv7 } from "uuid";

//! Yorum ekleme
export const addComment = async (comment, documentID) => {
  try {
    await updateDoc(doc(db, "products", documentID), {
      [`comments.${uuidv7()}`]: comment,
    });
    toastNotify(types.SUCCESS, "Comment added successfully");
  } catch (error) {
    toastNotify(types.ERROR, "Comment could not be added");
  }
};

//! Ürün Miktar artırma
export const increaseQuantity = async (
  product,
  documentID,
  setDoQuantityOperations
) => {
  try {
    setDoQuantityOperations(false);
    await updateDoc(doc(db, "users", documentID), {
      cart: {
        [product.id]: { ...product, quantity: product.quantity + 1 },
      },
    });
  } catch (error) {
    toastNotify(types.ERROR, "Product quantity could not be increased");
  } finally {
    setDoQuantityOperations(true);
  }
};
//! Ürün miktar azaltma
export const decreaseQuantity = async (
  product,
  documentID,
  setDoQuantityOperations
) => {
  try {
    setDoQuantityOperations(false);
    await updateDoc(doc(db, "users", documentID), {
      cart: {
        [product.id]: { ...product, quantity: product.quantity - 1 },
      },
    });
  } catch (error) {
    toastNotify(types.ERROR, "Product quantity could not be decreased");
  } finally {
    setDoQuantityOperations(true);
  }
};

//! Ürün sepete ekleme
export const addCart = async (product, documentID, quantity) => {
  try {
    await updateDoc(doc(db, "users", documentID), {
      [`cart.${product.id}`]: {
        quantity: quantity || 1,
        colorChoose: product.colorOptions[0],
        ...product,
      },
    });
  } catch (error) {
    toastNotify(types.ERROR, "Product could not be added");
  }
};

//! Sepet temizleme
export const clearCart = async (documentID) => {
  try {
    await updateDoc(doc(db, "users", documentID), {
      cart: {},
    });
    toastNotify(types.SUCCESS, `Your cart has been cleared`);
  } catch (error) {
    toastNotify(types.ERROR, "Cart could not be cleared");
  }
};
//! Sepetten ürün kaldırma
export const removeCart = async (product, documentID) => {
  try {
    await updateDoc(doc(db, "users", documentID), {
      [`${"cart"}.${product.id}`]: deleteField(),
    });
  } catch (error) {
    toastNotify(types.ERROR, "Product could not be delete");
  }
};
//! Favori ürün kaldırma
export const removeFavProduct = async (productID, documentID) => {
  try {
    await updateDoc(doc(db, "users", documentID), {
      [`favouritesProducts.${productID}`]: deleteField(),
    });
    toastNotify(types.SUCCESS, "The product has been moved to favorites");
  } catch (error) {
    toastNotify(types.ERROR, "Product could not be delete to favourites");
  }
};
//! Favori ürün ekleme
export const addFavProduct = async (product, documentID) => {
  try {
    await updateDoc(doc(db, "users", documentID), {
      [`favouritesProducts.${product.id}`]: product,
    });
    toastNotify(types.SUCCESS, "The product has been added to favorites");
  } catch (error) {
    toastNotify(types.ERROR, "Product could not be added to favourites");
  }
};

//! Aldığı filtre şartlarına göre filtreleme ve pagination yapar.
export const handleFiltre = async (
  filtreTags,
  currentPage,
  lastVisible,
  setLastVisible,
  pageSize
) => {
  const {
    minPrice,
    filteredBrands,
    filteredCategories,
    filteredYears,
    searchTerm,
  } = filtreTags;
  const collect = collection(db, "products");
  let q = query(collect, orderBy("title"), limit(pageSize));

  if (currentPage > 1) {
    q = query(
      collect,
      orderBy("title"),
      startAfter(lastVisible),
      limit(pageSize)
    );
  }

  if (minPrice > 0) q = query(q, where("price", ">=", minPrice));

  if (filteredBrands.length > 0)
    q = query(q, where("brand", "in", filteredBrands));

  if (filteredCategories.length > 0)
    q = query(q, where("category", "in", filteredCategories));

  if (filteredYears.length > 0)
    q = query(q, where("year", "in", filteredYears));

  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const updatedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (updatedProducts.length !== 0) {
    const docSnap = await getDoc(
      doc(db, "products", updatedProducts[updatedProducts.length - 1].id)
    );
    setLastVisible(docSnap);
  }
  return updatedProducts;
};
