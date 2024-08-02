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
import { v7 as uuidv7 } from "uuid";
import { ERROR, SUCCESS } from "../constants/types";

//! Yorum ekleme
export const addComment = async (comment, documentID) => {
  try {
    await updateDoc(doc(db, "products", documentID), {
      [`comments.${uuidv7()}`]: comment,
    });
    toastNotify(SUCCESS, "Comment added successfully");
  } catch (error) {
    toastNotify(ERROR, "Comment could not be added");
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
      [`cart.${product.id}`]: { ...product, quantity: product.quantity + 1 },
    });
  } catch (error) {
    toastNotify(ERROR, "Product quantity could not be increased");
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
      [`cart.${product.id}`]: { ...product, quantity: product.quantity - 1 },
    });
  } catch (error) {
    toastNotify(ERROR, "Product quantity could not be decreased");
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
    toastNotify(SUCCESS, `Add product successfully`);
  } catch (error) {
    toastNotify(ERROR, "Product could not be added");
  }
};

//! Sepet temizleme
export const clearCart = async (documentID) => {
  try {
    await updateDoc(doc(db, "users", documentID), {
      cart: {},
    });
    toastNotify(SUCCESS, `Your cart has been cleared`);
  } catch (error) {
    toastNotify(ERROR, "Cart could not be cleared");
  }
};
//! Sepetten ürün kaldırma
export const removeCart = async (product, documentID) => {
  try {
    await updateDoc(doc(db, "users", documentID), {
      [`${"cart"}.${product.id}`]: deleteField(),
    });
  } catch (error) {
    toastNotify(ERROR, "Product could not be delete");
  }
};
export const isFavProductLearn = async (productID, uid) => {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    const data = userDoc.data();
    const favourites = data.favouritesProducts || {};
    return !!favourites[productID];
  }
};
//! Favori ürün kaldırma
export const removeFavProduct = async (productID, documentID) => {
  try {
    await updateDoc(doc(db, "users", documentID), {
      [`favouritesProducts.${productID}`]: deleteField(),
    });
    toastNotify(SUCCESS, "The product has been moved to favorites");
  } catch (error) {
    toastNotify(ERROR, "Product could not be delete to favourites");
  }
};
//! Favori ürün ekleme
export const addFavProduct = async (product, documentID) => {
  try {
    await updateDoc(doc(db, "users", documentID), {
      [`favouritesProducts.${product.id}`]: product,
    });
    toastNotify(SUCCESS, "The product has been added to favorites");
  } catch (error) {
    toastNotify(ERROR, "Product could not be added to favourites");
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

  //! Sayfalama: Sonraki sayfalar için sorguyu son görünür belgeden(üründen) başlatacak şekilde ayarla
  if (currentPage > 1) {
    q = query(
      collect,
      orderBy("title"),
      startAfter(lastVisible),
      limit(pageSize)
    );
  }

  //! Minimum fiyat filtresini uygula eğer belirtilmişse
  if (minPrice > 0) q = query(q, where("price", ">=", minPrice));

  //! Seçili markalara göre filtreleme yapar
  if (filteredBrands.length > 0)
    q = query(q, where("brand", "in", filteredBrands));

  //! Seçili kategorilere göre filtreleme yap
  if (filteredCategories.length > 0)
    q = query(q, where("category", "in", filteredCategories));

  //! Seçili yıllara göre filtreleme yap
  if (filteredYears.length > 0)
    q = query(q, where("year", "in", filteredYears));

  const querySnapshot = await getDocs(q);
  //! Sorgu sonuçlarını ürün nesnelerinin bir dizisine dönüştür
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  //! Arama terimine göre ürünleri filtrele
  const updatedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //! Sayfalama için son görünür belgeyi(ürünü) güncelle, eğer sonuçlar varsa
  if (updatedProducts.length !== 0) {
    const docSnap = await getDoc(
      doc(db, "products", updatedProducts[updatedProducts.length - 1].id)
    );
    setLastVisible(docSnap);
  }
  //! Ürünlerdeki zaman keylerindeki timestamp türündeki değerleri düzenleme
  updatedProducts.forEach((product) => {
    Object.keys(product.comments).forEach((comment) => {
      product.comments[comment].time = product.comments[comment].time.seconds;
    });
  });

  return updatedProducts;
};
