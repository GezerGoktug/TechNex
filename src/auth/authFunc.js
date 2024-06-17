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
import types from "../constants/types";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export const handleRegister = async (email, password, userName) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: userName,
    });

    return user;
  } catch (error) {
    let message = null;
    if (error.code === "auth/email-already-in-use")
      message = "This email is already in use.";

    toastNotify(types.ERROR, message || error.message);
  }
};

export const handleLogin = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toastNotify(types.ERROR, error.message);
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    toastNotify(types.ERROR, error.message);
  }
};

export const handleDeleteUser = async () => {
  try {
    const uid = auth.currentUser.uid;
    await deleteUser(auth.currentUser);
    await deleteDoc(doc(db, "users", uid));
    return { opr: 1 };
  } catch (error) {
    toastNotify(types.ERROR, error.message);
    if (error.code === "auth/requires-recent-login") return { opr: 0 };
  }
};

export const sendResetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    toastNotify(types.ERROR, error.message);
  }
};

export const handleLoginApps = async (provider) => {
  try {
    const { user } = await signInWithPopup(auth, provider);
    return user;
  } catch (error) {
    if (error.code === "auth/account-exists-with-different-credential")
      toastNotify(
        types.ERROR,
        "You cannot open an account with different applications with the same email."
      );
    else toastNotify(types.ERROR, error.message);
  }
};
export const handleReauthenticate = async (password, provider) => {
  try {
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
    toastNotify(types.ERROR, error.message);
  }
};

export const handleUpdateProfile = async (
  password,
  userName,
  photoUrl,
  country,
  address
) => {
  try {
    if (password !== "") await updatePassword(auth.currentUser, password);

    await updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: photoUrl,
    });
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      address,
      country,
    });
    toastNotify(types.SUCCESS, "Update operation successfully");
    return { user: auth.currentUser };
  } catch (error) {
    toastNotify(types.ERROR, error.message);
    return { error: error.code };
  }
};
