import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../firebase/config";

//! Firebase storageden image leri getirmek için kullanılan hook

const useFirebaseImageUrl = (path) => {
  const [ımageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const getImageUrl = async () => {
      try {
        const imageRef = ref(storage, path);

        const imageUrl = await getDownloadURL(imageRef);

        setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error getting image URL:", error);
        return null;
      }
    };
    getImageUrl();
  }, []);
  return ımageUrl;
};

export default useFirebaseImageUrl;
