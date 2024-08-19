import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleDeleteUser, handleSignOut } from "../../auth/authFunc";
import { authActions } from "../../redux/slices/authSlice";
import { cartActions } from "../../redux/slices/cartSlice";
import { DELETE } from "../../constants/types";
import Button from "../UI/Button";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineReorder } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { modalActions } from "../../redux/slices/modalSlice";
import ReauthenticateModal from "./ReauthenticateModal";

const ProfilePanel = ({ setChanceProfilePanel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authSlice);
  dayjs.extend(relativeTime);
  //! Kullanıcıyı çıkış yapmak için kullanılan fonksiyon
  const handleLogOut = async () => {
    await handleSignOut();
    navigate("../auth");
    dispatch(authActions.logout());
    dispatch(cartActions.clearCart());
  };
  //! Kullanıcıyı silmek için kullanılan fonksiyon
  const handleDeleteAccount = async () => {
    const { opr } = await handleDeleteUser();
    if (opr) {
      navigate("../auth");
      dispatch(authActions.logout());
      dispatch(cartActions.clearCart());
    }
    //! Eğer silme işlemi başarısız olursa yeniden kimlik doğrulama modalını aç
    else dispatch(modalActions.openModal());
  };

  return (
    <>
      <ReauthenticateModal oprType={DELETE} />
      <div className="bg-gradient-to-tl text-center from-slate-300 to-zinc-200 px-4 py-8 rounded-lg h-max">
        <img
          className="h-[160px] bg-slate-600 mx-auto rounded-full w-[160px] "
          src={user?.photoURL}
          alt={user?.userName}
          referrerPolicy="no-referrer"
        />

        <h4 className="mt-6 text-3xl font-bold">{user?.userName}</h4>
        <div className="mt-4 text-gray-700  italic">
          Last login: {dayjs(user?.lastLogin).fromNow()}
        </div>
        <div className="mt-4 text-emerald-700 font-medium  ">{user?.email}</div>

        <div className="flex flex-col  mt-4 gap-1 ">
          <Button
            onClick={() => setChanceProfilePanel(true)}
            className="bg-indigo-600 mx-auto w-full xs:w-3/4 sm:w-1/2 lg:w-full hover:bg-indigo-800 rounded-md text-white"
          >
            <IoMdSettings />
            Settings
          </Button>
          <Button
            onClick={() => setChanceProfilePanel(false)}
            className="bg-indigo-600 mx-auto w-full xs:w-3/4 sm:w-1/2 lg:w-full hover:bg-indigo-800 rounded-md text-white"
          >
            <MdOutlineReorder />
            Orders
          </Button>
          <Button
            onClick={handleLogOut}
            className="bg-red-600 mx-auto w-full xs:w-3/4 sm:w-1/2 lg:w-full hover:bg-red-800 mt-4 rounded-md text-white"
          >
            <CiLogout />
            Exit
          </Button>
          <Button
            onClick={handleDeleteAccount}
            className="bg-red-600 mx-auto w-full xs:w-3/4 sm:w-1/2 lg:w-full hover:bg-red-800 mt-1 rounded-md text-white"
          >
            <FaTrash />
            Delete Account
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfilePanel;
