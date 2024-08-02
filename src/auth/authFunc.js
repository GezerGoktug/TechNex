import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  deleteUser,
  updatePassword,
  reauthenticateWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { toastNotify } from "../components/toastify/toastNotify";
import { ERROR, SUCCESS } from "../constants/types";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

//! Kayıt işlemi
export const handleRegister = async (email, password, userName) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: "/img/sections/defaultprofile.png",
    });

    return user;
  } catch (error) {
    let message = null;
    if (error.code === "auth/email-already-in-use")
      message = "This email is already in use.";

    toastNotify(ERROR, message || error.message);
  }
};

//! Giriş işlemi
export const handleLogin = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toastNotify(ERROR, error.message);
  }
};

//! Hesaptan çıkış işlemi
export const handleSignOut = async () => {
  try {
    await signOut(auth);
    toastNotify(SUCCESS, "Logout successful");
  } catch (error) {
    toastNotify(ERROR, error.message);
  }
};

//! Kullanıcı silme
export const handleDeleteUser = async () => {
  try {
    const uid = auth.currentUser.uid;
    await deleteUser(auth.currentUser);
    await deleteDoc(doc(db, "users", uid));
    toastNotify(SUCCESS, "Your account has been successfully deleted.");
    return { opr: 1 };
  } catch (error) {
    toastNotify(ERROR, error.message);
    if (error.code === "auth/requires-recent-login") return { opr: 0 };
  }
};

//! Şifre sıfırlama email gönderme
export const sendResetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toastNotify(
      SUCCESS,
      "Password reset link has been sent to your e-mail."
    );
  } catch (error) {
    toastNotify(ERROR, error.message);
  }
};

//! Seçilen Uygulama(Facebook,Google vb..) ile giriş işlemi
export const handleLoginApps = async (provider) => {
  try {
    const { user } = await signInWithPopup(auth, provider);
    return user;
  } catch (error) {
    if (error.code === "auth/account-exists-with-different-credential")
      toastNotify(
        ERROR,
        "You cannot open an account with different applications with the same email."
      );
    else toastNotify(ERROR, error.message);
  }
};

//! Yeniden oturum açma işlemi
export const handleReauthenticate = async (password, provider) => {
  try {
    //! Seçilen Uygulama ile(Google,Facebook vb...) yeniden oturum açma
    if (provider) {
      await reauthenticateWithPopup(auth.currentUser, provider);
      return;
    }
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
  } catch (error) {
    toastNotify(ERROR, error.message);
  }
};

//! Profil güncelleme
export const handleUpdateProfile = async (userData) => {
  const { password, userName, photoUrl, country, address } = userData;
  try {
    //! Şifre güncelleme
    if (password !== "") await updatePassword(auth.currentUser, password);

    //! Kullanıcı ismi ve fotoğrafı güncelleme
    await updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: photoUrl,
    });
    //! Adres ve ülke bilgilerini güncelleme
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      address,
      country,
    });
    toastNotify(SUCCESS, "Your account has been successfully updated.");
    return { user: auth.currentUser };
  } catch (error) {
    toastNotify(ERROR, error.message);
    return { error: error.code };
  }
};
